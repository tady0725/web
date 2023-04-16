//清除convas並重建
var resetCanvas1 = function(){
  $('#mycanvas1').remove(); // this is my <canvas> element
  $('#chart-container1').append('<canvas id="mycanvas1"><canvas>');
  $("#mycanvas1").width(300).height(150);
};



// 初始導入當天日期出現圖表
$(document).ready(function ()
{
    const dateObject = new Date() //Fri Jul 15 2016 16:23:49 GMT+0800 (CST)

    const date = dateObject.getDate() //15
    const month = dateObject.getMonth()  //6
    const hour = dateObject.getHours()
    // console.log(month); //
    const year = dateObject.getFullYear()  //2016
    let m = month + 1
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
    
    // console.log(String(m).length);

    if (hour < 10)
    {
        var hours = '0' + hour
    }
    else {
        var hours =  hour
    }

    // 判斷月份
    if (String(m).length > 1) 
        {
        console.log("no change ");
        var today = year + '-' + m + '-' + change_date + " " + hours + ":"
        }
    else
    {
        var today = year + '-' + 0+m + '-' + change_date + " " + hours + ":" 
        console.log("+0 ");
    }


 $.ajax(
        {
        type: "GET", //we are using GET method to get all record from the server
        url: 'http://210.70.179.173/dash/Model/min_data.php', // get the route value
        data: { 
        Start_Time : today, 
        },
        dataType: "json",
        success: function (response) {//once the request successfully process to the server side it will return result here
            console.log(response);
            let time = [];
            let in_ = [];
            let out_ = []; 
            let hour_num =  [
                '00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'
            ]
            color = [];

            color1 = "rgba(255,128,51,1.0)"; // Orange

            color22 = "rgba(0, 156, 255, .7)";
            color2 = [];
        
            for (let i in response)
            {
                time.push(response[i].time_);
                in_.push(response[i].in_);
                out_.push(response[i].out_);

                color.push(color1);
                color2.push(color22);

            }
            var chartdata = {
                labels: hour_num ,
                datasets:
                    [{
                        label: "IN_count", backgroundColor: color, data: in_, fill: false,
                    },
                    {label: "OUT_count", backgroundColor : color2, data:out_ ,fill: false,
                
                    }]
                
            };



            let ctx = $("#mycanvas1");
            // var ctx = document.getElementById("#mycanvas").getContext('2d');

            let bargraph = new Chart(ctx, {
                type: "bar",
                data: chartdata,
                options: {
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                                }
                            }
                        }
            });
            },
            error: function (response) {
                // responses = JSON.parse(response);
                console.log(response);
            }


        }
    );
    

});


function myFunction1() {
    resetCanvas1(); //清除舊圖
    // resetCanvas1(); //清除舊圖
    const Start_Date = $("#Start_hour").val(); //取得表單設定的起始時間
    
    let time = String(Start_Date).replace("T", " ");
    let format_time = String(time).split(':');
    var Start = String(format_time[0]);
    
    let st = Start + ":00"
    let ed = Start.split(' ');

    // console.log(ed[1]);
    let end = ( parseInt(ed[1]) + 1);
    console.log(end);
    console.log(String(format_time[0]));
    // console.log(time);

    document.getElementById("demo1").innerHTML = "查詢時間為"+ String(st) + "~" +  String(end)+":00";
    // console.log(today);
    $.ajax(
        {
        type: "GET", //we are using GET method to get all record from the server
        url: 'http://210.70.179.173/dash/Model/min_data.php', // get the route value
        data: { 
        Start_Time : Start, 
        },
        dataType: "json",
        success: function (response) {//once the request successfully process to the server side it will return result here
            let time = [];
            let in_ = [];
            let out_ = []; 
            let hour_num = [
                '00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'
            ]
            color = [];

            color1 = "rgba(255,128,51,1.0)"; // Orange

            color22 = "rgba(0, 156, 255, .7)";
            color2 = [];
        
            for (let i in response)
            {
                time.push(response[i].time_);
                in_.push(response[i].in_);
                out_.push(response[i].out_);

                color.push(color1);
                color2.push(color22);

            }
            var chartdata = {
                labels: hour_num ,
                datasets : [{
                    label: "IN_count", backgroundColor : color, data:in_ ,fill: false,},{label: "OUT_count", backgroundColor : color2, data:out_ ,fill: false,}]
                
            };

            var chartdata2 = {
                labels: hour_num,
                datasets : [{
                    label: "OUT_count", backgroundColor : color2, data:out_ ,fill: false,}]
                
            };

            let ctx = $("#mycanvas1");
            // var ctx = document.getElementById("#mycanvas").getContext('2d');

            let bargraph = new Chart(ctx, {
                type: "bar",
                data: chartdata,
                options: {
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                                }
                            }
                        }
            });
           
            },
            error: function (response) {
                // responses = JSON.parse(response);
                console.log(response);
            }


        }
    );
}