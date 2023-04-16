
<?php

header('Content-Type: application/json');
// 後端設置放行通行證 - http header
// 允許所有來源可以跨域存取。

// https: //wiki.mcneel.com/zh-tw/zoo/window7firewall
header('Access-Control-Allow-Origin: *');
$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASSWORD = '';
$DB_NAME = 'ai_center';

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD, $DB_NAME);

if (!$conn) {
    die("Could not connect to the database server" . $conn->error);
} else {
    echo "";
}

$s = __DIR__;
