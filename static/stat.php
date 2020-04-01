<?php
$method = 'POST';
require './.check_request.php';

$post = json_decode(file_get_contents('php://input'));
$required = [
    'id',
    'game',
    'name',
    'uid',
    'version',
    'data',
    'flag',
];
$result = [];
$data = [];
foreach($required as $key) {
    if (!isset($post->$key) || empty($post->$key)) http_response_code(403) && die(json_encode(['Access denied!']));
    $data[$key] = $post->$key;
}
$data['data'] = json_encode($data['data']);

if (!isset($USER_KEY) || $data['id'] != $USER_KEY) http_response_code(403) && die(json_encode(['Access denied!']));

$MYSQLI = new mysqli('localhost:3306', $db_user, $db_pass, $db_name);
if ($MYSQLI->connect_errno) {
    http_response_code(505) && die(json_encode(['Failed to connect to MySQL!']));
}

if ($USER == null) {
    if (!($insert = $MYSQLI->prepare('INSERT INTO `user`(`id`, `game`, `uid`, `version`, `name`, `data`) VALUES (?, ?, ?, ?, ?, ?)'))) {
        http_response_code(501) && die(json_encode(['Preparing Statement failed!']));
    }
    $insert->bind_param('ssisss', $USER_KEY, $data['game'], $data['uid'], $data['version'], $data['name'], $data['data']);
    if (!$insert->execute()) {
        die(json_encode(['Execute failed!', $insert->error]));
    }
    $insert->close();

    $data['data'] = json_decode($data['data']);
    $webhook_body = json_encode([
        'embeds' => [
            [
                'author' => [
                    'name' => 'LSS-Manager V.4',
                ],
                'title' => '**New Telemetry Entry** '.$data['flag'],
                'color' => 13185068,
                'description' => '**[*'.$data['uid'].'*]**: '.$data['name']."\n".
                    '**Version**: '.$data['version']."\n".
                    '**Broswer**: '.$data['data']->browser."\n".
                    '**Buildings**: '.$data['data']->buildings."\n".
                    "**Modules**: ```md\n* ".join("\n* ", $data['data']->modules).'```',
                'timestamp' => date(DATE_ATOM),
                'footer' => [
                    'text' => $USER_KEY,
                ]
            ]
        ]
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    $webhook_curl = curl_init();
    curl_setopt_array($webhook_curl, [
        CURLOPT_URL => $configs->discord_webhook_url,
        CURLOPT_POST => true, CURLOPT_POSTFIELDS => $webhook_body,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER =>[
            'Content-Type:application/json',
        ]
    ]);

    $webhook_response = curl_exec($webhook_curl);
    curl_close($webhook_curl);

    $result['success'] = $webhook_response == '';
} else {
    if (!($update = $MYSQLI->prepare('UPDATE `user` SET `name`=?, `version`=?, `data`=?, `timestamp`=CURRENT_TIMESTAMP() WHERE `id`=?'))) {
        http_response_code(503) && die(json_encode(['Preparing Statement failed!']));
    }
    $update->bind_param('ssss', $data['name'], $data['version'], $data['data'], $USER_KEY);
    if (!$update->execute()) {
        http_response_code(504) && die(json_encode(['Execute failed!']));
    }
    $update->close();
    $result['success'] = true;
}

echo json_encode($result);
