<?php
//  整點
include 'C:\xampp\htdocs\dash\Controlles\db_con.php';

$return_arr = array();

# GET
$Start_Time = $_GET['Start_Time'];
// echo $s;

$End_Time = $_GET['End_Time'];

// echo $Start_Time . "\n";
// echo $End_Time . "\n";

// SELECT SUM(in_),SUM(out_), DATE_FORMAT(time_, '%Y-%m-%d') FROM hour_count WHERE time_ >= '2022-07-25' and time_ <= '2022-07-31' GROUP BY DATE_FORMAT(time_, '%Y-%m-%d');
$sql = "SELECT SUM(in_),SUM(out_), DATE_FORMAT(time_, '%Y-%m-%d') as dt FROM flow_people WHERE time_ >= '$Start_Time' and time_ <= '$End_Time' GROUP BY DATE_FORMAT(time_, '%Y-%m-%d'); ";
// echo $sql . "\n";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // 輸出數據

    $row = mysqli_fetch_assoc($result);
    // echo $row['SUM(in_)'] . "\n";
    // echo $row['SUM(out_)'] . "\n";
    $row_array['in_'] = $row['SUM(in_)'];
    $row_array['out_'] = $row['SUM(out_)'];
    $row_array['time_'] = $row['dt'];
    // 堆疊陣列資料
    array_push($return_arr, $row_array);

    while ($row = mysqli_fetch_assoc($result)) {
        $row_array['in_'] = $row['SUM(in_)'];
        $row_array['out_'] = $row['SUM(out_)'];
        $row_array['time_'] = $row['dt'];
        // 堆疊陣列資料
        array_push($return_arr, $row_array);
    }
    //輸出JSON
    echo json_encode($return_arr);
} else {
    echo "";
}
$result->close();
mysqli_close($conn);
