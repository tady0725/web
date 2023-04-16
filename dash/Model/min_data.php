<?php

include 'C:\xampp\htdocs\dash\Controlles\db_con.php';

$return_arr = array();

# GET
$Start_Time = $_GET['Start_Time'];
// echo $Start_Time . "\n";

$other =  $Start_Time . "00";
// echo $other . "\n";

// $gettime = $Start_Time . ":00";

// $sql1 = "SELECT * FROM flow_people WHERE time_ LIKE '%$other%' ";

// $sql1 = "SELECT * FROM flow_people WHERE time_ LIKE '%$other%' ";
// $result1 = mysqli_query($conn, $sql1);
// // 輸出數據
// $row1 = mysqli_fetch_assoc($result1);
// if (mysqli_num_rows($result1) > 0) {
//     $row_array['in_'] = $row1['in_'];
//     $row_array['out_'] = $row1['out_'];
//     $row_array['time_'] = $row1['time_'];
//     // 堆疊陣列資料
//     array_push($return_arr, $row_array);
// } else {
//     echo "";
// }


$sql = "SELECT * FROM flow_people WHERE time_ LIKE '%$Start_Time%' ";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    // 輸出數據

    // php read 缺少第一筆資料 先拉出第一筆 再進去迴圈
    $row = mysqli_fetch_assoc($result);
    $row_array['in_'] = $row['in_'];
    $row_array['out_'] = $row['out_'];
    $row_array['time_'] = $row['time_'];

    // 堆疊陣列資料
    array_push($return_arr, $row_array);
    while ($row = mysqli_fetch_assoc($result)) {
        $row_array['in_'] = $row['in_'];
        $row_array['out_'] = $row['out_'];
        $row_array['time_'] = $row['time_'];
        // 堆疊陣列資料
        array_push($return_arr, $row_array);
    }
    //輸出JSON
    echo json_encode($return_arr);
} else {
    echo "0 個查詢結果";
}
$result->close();
mysqli_close($conn);

// print_r($return_arr);
// $row_array['time_'] = $row['time_'];