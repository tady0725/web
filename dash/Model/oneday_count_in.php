<?php

include 'C:\xampp\htdocs\dash\Controlles\db_con.php';

$return_arr = array();

# GET
$Start_Time = $_GET['Start_Time'];

// echo $Start_Time . "\n";

$count_in = 0;
$count_out = 0;


$sql = "SELECT * FROM flow_people WHERE time_ LIKE '%$Start_Time%' ";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    // 輸出數據
    $row = mysqli_fetch_assoc($result);
    while ($row = mysqli_fetch_assoc($result)) {
        // echo  $row['in_'] . "\n";
        // echo $row['out_'] . "\n";
        $count_in +=  $row['in_'];
        $count_out +=  $row['out_'];
    }
    // echo $count_in . "\n";
    // echo  $count_out;
    $row_array['in_'] = $count_in;
    $row_array['out_'] = $count_out;
    // $row_array['time_'] = $row['time_'];
    // 堆疊陣列資料
    array_push($return_arr, $row_array);
    //輸出JSON
    echo json_encode($return_arr);
} else {
    echo "0 個查詢結果";
}
$result->close();
mysqli_close($conn);

// print_r($return_arr);
// $row_array['time_'] = $row['time_'];