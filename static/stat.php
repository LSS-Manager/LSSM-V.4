<?php
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: content-type');
require './stat_access.php';

$post = json_decode(file_get_contents('php://input'));
$required = [
	'id',
	'game',
	'name',
	'uid',
	'data',
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
	$result['success'] = true;
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
