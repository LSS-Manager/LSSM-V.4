<?php
ob_start();
session_start();

require_once './core/core.php';

$page = preg_replace('@^/admin/|\.[^.]*$@', '', $_SERVER['REQUEST_URI']);
if (!$page || $page == 'header' || $page == 'footer') $page = 'index';

if (!strpos($page, '/ajax/')) require 'templates/header.php';

if (file_exists("./templates/{$page}.php")) {
    require "./templates/{$page}.php";
}
else require './templates/error/404.php';
