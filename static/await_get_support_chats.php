<?php
$method = 'GET';
require './.check_request.php';

$result = array();

$MYSQLI = new mysqli('localhost:3306', $db_user, $db_pass, $db_name);
if ($MYSQLI->connect_errno) {
    http_response_code(500) && die(json_encode(['Failed to connect to MySQL!']));
}
$query = 'SELECT `author`, `content`, `timestamp`, `uid`, `status` FROM `support_chat`, `support_message` WHERE ';
if (!in_array($USER['uid'], $configs->admins)) $query .= '`uid`=? AND ';
$query .= '`chat`=`support_chat`.`id`';
if (!($search = $MYSQLI->prepare($query))) {
    die(json_encode(['Preparing Statement failed!']));
}
if (!in_array($USER['uid'], $configs->admins)) $search->bind_param('s', $USER_KEY);
if (!$search->execute()) {
    die(json_encode(['Execute failed!']));
}
if (!($res = $search->get_result())) {
    die(json_encode(['Getting result set failed!']));
}
$search->close();
while($r = $res->fetch_assoc()) {
    $result[$r['uid']]['messages'] = [
        'author' => $r['author'],
        'content' => $r['content'],
        'timestamp' => $r['timestamp'],
    ];
    $result[$r['uid']]['status'] = $r['status'];
}

echo json_encode($result);
