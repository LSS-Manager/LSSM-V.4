<?php
$method = 'POST';
require '../.check_request.php';
require '../utils/webhook.php';

$post = json_decode(file_get_contents('php://input'));
$required = [
    'chat',
];
$result = [];
$data = [];
if (isset($post->username)) $data['username'] = $post->username;
else $data['username'] = 'Someone';
if (isset($post->admin)) $data['admin'] = $post->admin;
else $data['admin'] = 'An Admin';
foreach($required as $key) {
    if (!isset($post->$key) || empty($post->$key) || !strlen($post->$key)) http_response_code(403) && die(json_encode(['Access denied!']));
    $data[$key] = $post->$key;
}

if (!($update = $MYSQLI->prepare('UPDATE `support_chat` SET `status`="archived" WHERE `uid`=?'))) {
    http_response_code(501) && die(json_encode(['Preparing Statement failed!']));
}
$status = 'archived';
$update->bind_param('s', $data['chat']);
if (!$update->execute()) {
    die(json_encode(['Execute failed!']));
}
$update->close();
$webhook_body = json_encode([
    'embeds' => [
        [
            'author' => [
                'name' => 'LSS-Manager V.4',
            ],
            'title' => '**Support closed**',
            'color' => 13185068,
            'description' => '*'.$data['admin'].'* closed the support chat with *'.$data['username'].'*',
            'timestamp' => date(DATE_ATOM),
        ]
    ]
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
$webhook_response = webhook($webhook_body, $configs->discord_webhook_url);

$result['success'] = $webhook_response == '';

echo json_encode($result);
