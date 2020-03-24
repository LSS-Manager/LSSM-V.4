<?php
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: content-type');
require './db_access.php';

$post = json_decode(file_get_contents('php://input'));
$required = [
    'id',
    'game',
    'name',
    'uid',
    'data',
    'flag',
];
$result = [];
$data = [];
foreach($required as $key) {
    if (!isset($post->$key) || empty($post->$key)) die(json_encode(['Access denied!']));
    $data[$key] = $post->$key;
}
$data['data'] = json_encode($data['data']);

$mysqli = new mysqli('localhost:3306', $db_user, $db_pass, $db_name);
if ($mysqli->connect_errno) {
    die(json_encode(['Failed to connect to MySQL!']));
}
if (!($search = $mysqli->prepare('SELECT `id` FROM `user` WHERE `id`=?'))) {
    die(json_encode(['Preparing Statement failed!']));
}
$search->bind_param('s', $data['id']);
if (!$search->execute()) {
    die(json_encode(['Execute failed!']));
}
if (!($res = $search->get_result())) {
    die(json_encode(['Getting result set failed!']));
}
if (empty($res->fetch_all())) {
    if (!($insert = $mysqli->prepare('INSERT INTO `user`(`id`, `game`, `uid`, `name`, `data`) VALUES (?, ?, ?, ?, ?)'))) {
        die(json_encode(['Preparing Statement failed!']));
    }
    $insert->bind_param('ssiss', $data['id'], $data['game'], $data['uid'], $data['name'], $data['data']);
    if (!$insert->execute()) {
        die(json_encode(['Execute failed!']));
    }
    $insert->close();

    require 'php_configs.php';

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
                    '**Version**: '.$data['data']->version."\n".
                    '**Broswer**: '.$data['data']->browser."\n".
                    '**Buildings**: '.$data['data']->buildings."\n".
                    "**Modules**: ```md\n* ".join("\n* ", $data['data']->modules).'```',
                'timestamp' => date(DATE_ATOM),
                'footer' => [
                    'text' => $data['id'],
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
    if (!($update = $mysqli->prepare('UPDATE `user` SET `name`=?, `data`=?, `timestamp`=CURRENT_TIMESTAMP() WHERE `id`=?'))) {
        die(json_encode(['Preparing Statement failed!']));
    }
    $update->bind_param('sss', $data['name'], $data['data'], $data['id']);
    if (!$update->execute()) {
        die(json_encode(['Execute failed!']));
    }
    $update->close();
    $result['success'] = true;
}

echo json_encode($result);
