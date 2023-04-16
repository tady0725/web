<?php

include 'C:\xampp\htdocs\dash\Controlles\db_con.php';

$return_arr = array();

# GET
$Start_Time = $_GET['Start_Time'];
// echo $Start_Time . "\n";

$sql = "SELECT * FROM hour_count WHERE time_ LIKE '%$Start_Time%' ";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    // 輸出數據
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