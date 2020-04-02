<?php
$method = 'POST';
require '../.check_request.php';

$post = json_decode(file_get_contents('php://input'));
$required = [
    'chat',
];
$result = [];
$data = [];
foreach($required as $key) {
    if (!isset($post->$key) || empty($post->$key) || !strlen($post->$key)) http_response_code(403) && die(json_encode(['Access denied!']));
    $data[$key] = $post->$key;
}

if (!in_array($U_LANG_ID, $configs->admins)) {
    if (!($update = $MYSQLI->prepare('UPDATE `support_chat` SET `status`="read" WHERE `uid`=? AND `status`="unread"'))) {
        http_response_code(501) && die(json_encode(['Preparing Statement failed!']));
    }
    $update->bind_param('s', $data['chat']);
    if (!$update->execute()) {
        die(json_encode(['Execute failed!']));
    }
    $update->close();

    $result['success'] = true;
}

echo json_encode($result);
