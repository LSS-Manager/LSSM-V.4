<?php
$method = 'GET';
require './.check_request.php';

$result = [];

$MYSQLI = new mysqli('localhost:3306', $db_user, $db_pass, $db_name);
if ($MYSQLI->connect_errno) {
    http_response_code(500) && die(json_encode(['Failed to connect to MySQL!']));
}


echo json_encode($result);
