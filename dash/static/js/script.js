// 顯示當前時間
function ShowTime() {
    var NowDate=new Date();
    var h=NowDate.getHours();
    var m=NowDate.getMinutes();
    var s = NowDate.getSeconds();
    
if (h > 12)
    {
        document.getElementById('showbox').innerHTML = "現在時間: "+ "下午" + h+'時'+m+'分'+s+'秒';
    }
else {
        document.getElementById('showbox').innerHTML = "現在時間: "+ "上午" + h+'時'+m+'分'+s+'秒';
}
// 每一秒刷新
setTimeout('ShowTime()',1000);
}


//清除convas並重建
// 重建新的圖
var resetCanvas = function(){
  $('#mycanvas').remove(); // this is my <canvas> element
  $('#chart-container').append('<canvas id="mycanvas"><canvas>');
  $("#mycanvas").width(300).height(150);
};




// 初始導入當天日期出現圖表
$(document).ready(function ()
{
    ShowTime();
    const dateObject = new Date() //Fri Jul 15 2016 16:23:49 GMT+0800 (CST)
    const date = dateObject.getDate() //15
    const month = dateObject.getMonth()  //6
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
    // document.getElementById("demo").innerHTML = "查詢日期 :"+ today;
    // console.log(today);

// 顯示當日1~24 每小時數據
 $.ajax(
        {
        type: "GET", //we are using GET method to get all record from the server
        url: 'http://210.70.179.173/dash/Model/data.php', // get the route value
        data: { 
        Start_Time : today, 
        },
        dataType: "json",
        success: function (response) {//once the request successfully process to the server side it will return result here
            let time = [];
            let in_ = [];
            let out_ = []; 
            let hour_num = [
                 '01', '02', '03', '04', '05', '06', '07', '08','09', '10', '11', '12', '13', '14', '15', '16' ,'17', '18', '19', '20', '21', '22', '23' ,'24']
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
            let ctx = $("#mycanvas");
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


function myFunction() {
    resetCanvas(); //清除舊圖
    const Start_Date = $("#Start_Date").val(); //取得表單設定的起始時間
    console.log(Start_Date);
    // 顯示當前查詢日期
    document.getElementById("demo").innerHTML = "查詢日期 :"+ Start_Date;
    $.ajax(
        {
        type: "GET", //we are using GET method to get all record from the server
        url: 'http://210.70.179.173/dash/Model/data.php', // get the route value
        data: { 
        Start_Time : Start_Date, 
        },
        dataType: "json",
        success: function (response) {//once the request successfully process to the server side it will return result here
            let time = [];
            let in_ = [];
            let out_ = []; 
            let hour_num = [
                 '01', '02', '03', '04', '05', '06', '07', '08','09', '10', '11', '12', '13', '14', '15', '16' ,'17', '18', '19', '20', '21', '22', '23' ,'24']
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

            let ctx = $("#mycanvas");
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



// var now = new Date(); 
// var nowTime = now.getTime() ; 
// var day = now.getDay();
// var oneDayTime = 24*60*60*1000 ; 

// //显示周一
// var MondayTime = nowTime - (day-1)*oneDayTime ; 
// //显示周日
// var SundayTime = nowTime + (7 - day) * oneDayTime; 



// //初始化日期时间
// var monday = new Date(MondayTime);
// var sunday = new Date(SundayTime);

// const end_date = sunday.getDate();
// const end_year = sunday.getFullYear();  //2016
// const end_month = sunday.getMonth();
// let em = end_month + 1

// // 判斷月份
// if (String(em).length > 1) 
//     {
//     var end = end_year + '-' + em + '-' + end_date  
//     }
// else
// {
//     var end = end_year + '-' + 0+em + '-' + end_date
// }




// const start_date = monday.getDate() //15
// const start_month = monday.getMonth()  //6
// // console.log(month); //
// const start_year = monday.getFullYear()  //2016
// let start_m = start_month + 1

// // 判斷月份
// if (String(start_m).length > 1) 
//     {
//     var start = start_year + '-' + start_m + '-' + start_date  
//     }
// else
// {
//     var start = start_year + '-' + 0+start_m + '-' + start_date
// }

// console.log(start);
// console.log(end);




// //打印查看结果

// console.log(monday) ; 
// console.log(sunday) ; 
// SELECT * FROM hour_count WHERE time_ >= '2022-07-25' and time_ <= '2022-07-31';