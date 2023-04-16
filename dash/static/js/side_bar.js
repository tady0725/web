function funcTest(){
    
    //每隔5分鐘执行一次
    window.setInterval("timelyFun()", 1000 * 60 * 5);
    window.setInterval("minute5()", 1000 * 60 * 5);
    
}
window.onload = funcTest;

// 載完成執行
$(document).ready(function ()
{
    timelyFun();
    minute5();
});


function minute5(){

    

    $.ajax(
        {
        type: "GET", //we are using GET method to get all record from the server
        url: 'http://210.70.179.173/dash/Model/minute5_count_curr.php', // get the route value
        data: { 
        Start_Time : "ok", 
        },
        dataType: "json",
            success: function (response) {
                console.log(response);
                // console.log(response[0].in_);
                let in_ = response[0].in_;
                let out_ = response[0].out_;
                document.getElementById("5min_count_in").innerHTML = in_ + "人";
                document.getElementById("5min_count_out").innerHTML = out_ + "人";
            },
            error: function (response) {

                console.log(response);
            }


        }
    );

}



function timelyFun()
{
    const dateObject = new Date() //Fri Jul 15 2016 16:23:49 GMT+0800 (CST)

    const date = dateObject.getDate() //15
    const month = dateObject.getMonth()  //6
    // console.log(month); //
    const year = dateObject.getFullYear()  //2016
    let m = month + 1
    
    // console.log(String(m).length);
    // 判斷 1到9日
    if (String(date).length > 1) {
        // console.log("no change ");
        var change_date = date;
    }
    else
    {
        var change_date = "0" + date;  
        // console.log("change ");
    }

    // 判斷月份 
    if (String(m).length > 1) 
        {
        console.log("no change ");
        var today = year + '-' + m + '-' + change_date
        }
    else
    {
        var today = year + '-' + 0+m + '-' + change_date
        console.log("+0 ");
    }
    
    console.log(today);
    
    //  
    $.ajax(
        {
        type: "GET", //we are using GET method to get all record from the server
        url: 'http://210.70.179.173/dash/Model/oneday_count_in.php', // get the route value
        data: { 
        Start_Time : today, 
        },
        dataType: "json",
            success: function (response) {
                console.log(response);
                // console.log(response[0].in_);
                let in_ = response[0].in_;
                let out_ = response[0].out_;
                document.getElementById("day_count_in").innerHTML = in_ + "人";
                document.getElementById("day_count_out").innerHTML = out_ + "人";


            },
            error: function (response) {

                console.log(response);





            }


        }
    );
}

