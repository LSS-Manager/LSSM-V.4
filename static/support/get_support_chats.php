<?php
$method = 'GET';
require '../.check_request.php';

$result = [];

$MYSQLI = new mysqli('localhost:3306', $db_user, $db_pass, $db_name);
if ($MYSQLI->connect_errno) {
    http_response_code(500) && die(json_encode(['Failed to connect to MySQL!']));
}
$query = 'SELECT `name`, `content`, `support_message`.`timestamp`, `status`, `support_chat`.`uid` AS `member`, `user`.`uid` AS `author`, `user`.`name` AS `memberName` FROM `support_chat`, `support_message`, `user` WHERE ';
if (!in_array($U_LANG_ID, $configs->admins)) $query .= '`support_chat`.`uid`=? AND ';
$query .= '`chat`=`support_chat`.`id` AND `author`=`user`.`id` AND `status`!="archived" ORDER BY `support_message`.`timestamp`';
if (!($search = $MYSQLI->prepare($query))) {
    die(json_encode(['Preparing Statement failed!', $query]));
}
if (!in_array($U_LANG_ID, $configs->admins)) $search->bind_param('s', $USER_KEY);
if (!$search->execute()) {
    die(json_encode(['Execute failed!']));
}
if (!($res = $search->get_result())) {
    die(json_encode(['Getting result set failed!']));
}
$search->close();
while($r = $res->fetch_assoc()) {
    $result[$r['member']]['messages'][] = [
        'author' => [
            'name' => $r['name'],
            'uid' => $r['author'],
        ],
        'content' => html_entity_decode($r['content'], ENT_QUOTES, 'UTF-8'),
        'timestamp' => $r['timestamp'],
    ];
    $result[$r['member']]['status'] = $r['status'];
}
if (empty($result)) $result[$USER_KEY] = [
    'messages' => [],
];

echo json_encode($result);
