<?php
$method = 'POST';
require '../.check_request.php';
require '../utils/webhook.php';

$post = json_decode(file_get_contents('php://input'));
$required = [
    'chat',
    'message'
];
$result = [];
$data = [];
foreach($required as $key) {
    if (!isset($post->$key) || empty($post->$key) || !strlen($post->$key)) http_response_code(403) && die(json_encode(['Access denied!']));
    $data[$key] = $post->$key;
}
if (isset($post->username)) $data['username'] = $post->username;
else $data['username'] = '*Someone*';

$data['message'] = htmlentities($data['message'], ENT_QUOTES, 'UTF-8');

$MYSQLI = new mysqli('localhost:3306', $db_user, $db_pass, $db_name);
if ($MYSQLI->connect_errno) {
    http_response_code(505) && die(json_encode(['Failed to connect to MySQL!']));
}

if (!($search = $MYSQLI->prepare('SELECT * FROM `support_chat` WHERE `uid`=?'))) {
    die(json_encode(['Preparing Statement failed!']));
}
$search->bind_param('s', $data['chat']);
if (!$search->execute()) {
    die(json_encode(['Execute failed!']));
}
if (!($res = $search->get_result())) {
    die(json_encode(['Getting result set failed!']));
}
$search->close();
$chat = $res->fetch_assoc();
$chat_id = null;
if (!isset($chat)) {
    if ($USER_KEY != $data['chat']) die(json_encode(['Access denied!']));
    if (!($insert = $MYSQLI->prepare('INSERT INTO `support_chat`(`uid`) VALUES (?)'))) {
        http_response_code(501) && die(json_encode(['Preparing Statement failed!']));
    }
    $insert->bind_param('s', $data['chat']);
    if (!$insert->execute()) {
        die(json_encode(['Execute failed!']));
    }
    $chat_id = $insert->insert_id;
    $insert->close();
} else $chat_id = $chat['id'];

if (!($insert = $MYSQLI->prepare('INSERT INTO `support_message`(`author`, `chat`, `content`) VALUES (?, ?, ?)'))) {
    http_response_code(501) && die(json_encode(['Preparing Statement failed!']));
}
$insert->bind_param('sis', $USER_KEY, $chat_id, $data['message']);
if (!$insert->execute()) {
    die(json_encode(['Execute failed!', $insert->error]));
}
$insert->close();
$status = $USER_KEY != $data['chat'] ? 'unread' : 'new';
if (!($update = $MYSQLI->prepare('UPDATE `support_chat` SET `status`=? WHERE `id`=?'))) {
    http_response_code(501) && die(json_encode(['Preparing Statement failed!']));
}
$update->bind_param('ss', $status, $chat_id);
if (!$update->execute()) {
    die(json_encode(['Execute failed!', $update->error]));
}
$update->close();
$webhook_body = json_encode([
    'embeds' => [
        [
            'author' => [
                'name' => 'LSS-Manager V.4',
            ],
            'title' => '**New Message in Support**',
            'color' => 13185068,
            'description' => '**'.$data['username'].'** just answered in the Support Chat:'.
                "\n```".preg_replace('/`/m', "\`", html_entity_decode($data['message'], ENT_QUOTES, 'UTF-8')).'```',
            'timestamp' => date(DATE_ATOM),
        ]
    ]
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
$webhook_response = webhook($webhook_body, $configs->discord_webhook_url);

$result['success'] = $webhook_response == '';

echo json_encode($result);
