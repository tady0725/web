function func(){

    // 自動5分鐘 ajax update data
    window.setInterval("week_data()", 1000 * 60 * 5);
    window.setInterval("month_data()", 1000 * 60 * 5);
}
window.onload = func;

// 抓到當前一周 起始幾號到結束
var now = new Date(); 
var nowTime = now.getTime() ; 
var day = now.getDay();
var oneDayTime = 24*60*60*1000 ; 

//显示周一
var MondayTime = nowTime - (day-1)*oneDayTime ; 
//显示周日
var SundayTime = nowTime + (7 - day) * oneDayTime; 



//初始化日期时间
var monday = new Date(MondayTime);
var sunday = new Date(SundayTime);

const end_date = sunday.getDate();
const end_year = sunday.getFullYear();  //2016
const end_month = sunday.getMonth();
let em = end_month + 1

// 判斷 1到9日
if (String(end_date).length > 1) {
    // console.log("no change ");
    var change_date = end_date;
}
else
{
    var change_date = "0" + end_date;  
    // console.log("change ");
}
// 判斷月份
if (String(em).length > 1) 
    {
    var end = end_year + '-' + em + '-' + change_date 
    }
else
{
    var end = end_year + '-' + 0+em + '-' + change_date
}




const start_date = monday.getDate() //15
const start_month = monday.getMonth()  //6
// console.log(month); //
const start_year = monday.getFullYear()  //2016
let start_m = start_month + 1

// 判斷 1到9日
if (String(start_date).length > 1) {
    // console.log("no change ");
    var change_date_s = start_date ;
}
else
{
    var change_date_s = "0" + start_date ;  
    // console.log("change ");
}
// 判斷月份
if (String(start_m).length > 1) 
    {
    var start = start_year + '-' + start_m + '-' +  change_date_s 
    }
else
{
    var start = start_year + '-' + 0+start_m + '-' +  change_date_s
}

console.log(start);
console.log(end);

//打印查看结果

// console.log(monday) ;
// console.log(sunday) ;
// SELECT * FROM hour_count WHERE time_ >= '2022-07-25' and time_ <= '2022-07-31';


$(document).ready(function ()
{
    week_data();
    month_data();
});


function week_data(){

    

    $.ajax(
        {
        type: "GET", //we are using GET method to get all record from the server
        url: 'http://210.70.179.173/dash/Model/a_week_in_out.php', // get the route value
        data: { 
            Start_Time: start, 
            End_Time : end,
        },
        dataType: "json",
            success: function (response) {
                // console.log(response);
                let time = [];
                let in_ = [];
                let out_ = []; 
                for (let i in response)
                {
                    time.push(response[i].time_);
                    in_.push(response[i].in_);
                    out_.push(response[i].out_);
                }

                var ctx = document.getElementById('mycanvas3').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data:
                    {
                        labels: time ,//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        datasets:
                            [
                                {
                                label: '當日進入總人數',
                                data: in_ ,

                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                },
                                {
                                label: '當日離開總人數',
                                data: out_,
                                fill: false,
                                borderColor: 'rgba(0, 156, 255, .7)',
                                }
                            ]
                    },
                });
                



            },
            error: function (response) {

                console.log(response);





            }


        }
    );

}

var date = new Date(),
y = date.getFullYear(),
m = date.getMonth();
m = m + 1;
var firstDay = new Date(y, m , 1);
var lastDay = new Date(y, m, 0);
// alert("第一天："+firstDay.toString());
// alert("最後一天："+lastDay.toString());
const m_start_date = firstDay.getDate();
const m_start_year = firstDay.getFullYear();  //2016
const m_start_month = firstDay.getMonth();

const m_lastDay = lastDay.getDate();

let m_data = m_start_month;
console.log(m_data);


// 判斷月份
if (String(m_data).length > 1) 
    {
    var m_start = m_start_year + '-' + m_data + '-' + m_start_date;
    var m_end = m_start_year + '-' + m_data + '-' + m_lastDay;
    }
else
{
    var m_start = m_start_year + '-' + 0 + m_data + '-' + m_start_date;
    var m_end = m_start_year + '-' + 0 + m_data + '-' + m_lastDay ;
}


function month_data(){

    $.ajax(
        {
        type: "GET", //we are using GET method to get all record from the server
        url: 'http://210.70.179.173/dash/Model/a_month_in_out.php', // get the route value
        data: { 
            Start_Time: m_start, 
            End_Time : m_end,
        },
        dataType: "json",
            success: function (response) {
                // console.log(response);
                let time = [];
                let in_ = [];
                let out_ = []; 
                for (let i in response)
                {
                    time.push(response[i].time_);
                    in_.push(response[i].in_);
                    out_.push(response[i].out_);
                }

                var ctx = document.getElementById('mycanvas4').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data:
                    {
                        labels: time ,//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        datasets:
                            [
                                {
                                label: '當日進入總人數',
                                data: in_ ,

                                fill: false,
                                borderColor: 'rgba(255,128,51,1.0)',
                                },
                                {
                                label: '當日離開總人數',
                                data: out_,
                                fill: false,
                                borderColor: 'rgba(0, 156, 255, .7)',
                                }
                            ]
                    },
                });
            },
            error: function (response) {

                console.log(response);





            }


        }
    );

}


let select = document.querySelector("#form-select");
select.addEventListener("change", selectFun);

function selectFun() {
  const switchValue = select.options[select.selectedIndex].value;
  switch (switchValue) {
      case "1":
          var change_m = "Jan";
          time(change_m);
            // alert("1");
            break;
    case "2":
        //   alert("2");
          var change_m = "Feb";
          time(change_m);
            break;
    case "3":
        //   alert("3");
          var change_m = "Mar"; 
          time(change_m);
      break;
    case "4":
        //   alert("4");
          var change_m = "Apr";
          time(change_m);
      break;
    case "5":
        //   alert("5");
          var change_m = "May";
          time(change_m);
      break;
    case "6":
        //   alert("6");
          var change_m = "Jun";
          time(change_m);
          break;
    case "7":
        //   alert("7");
          var change_m = "Jul";
          time(change_m);
          break;
    case "8":
        //   alert("8");
          var change_m = "Aug";
          time(change_m);
          break;
    case "9":
        //   alert("9");
          var change_m = "Sept";
          time(change_m);
          break;
    case "10":
        //   alert("10");
          var change_m = "Oct";
          time(change_m);
          break;
    case "11":
        //   alert("11");
          var change_m = "Nov";
          time(change_m);
          break;
    case "12":
        //   alert("12");
          var change_m = "Dec";
          time(change_m);
          break;
    default:
      return;
  }
}

//清除convas並重建
var resetCanvas4 = function(){
  $('#mycanvas4').remove(); // this is my <canvas> element
  $('#chart-container4').append('<canvas id="mycanvas4"><canvas>');
  $("#mycanvas4").width(300).height(150);
};
function time(change_m)
{
    resetCanvas4();
    // console.log(change_m);
    var my_date = new Date(start_year + ", " + change_m);
    // console.log(my_date.getFullYear());
    // console.log(my_date.getMonth());
    let year = my_date.getFullYear();
    let month = my_date.getMonth();
    month = month + 1;
    var first_date_m = new Date(year, month, 1);
    var last_date_m = new Date(year, month, 0);
    
    const select_start_date = first_date_m .getDate();
    const select_start_year = first_date_m .getFullYear();  //2016
    const select_start_month = first_date_m .getMonth();

    const select_lastDay = last_date_m.getDate();

    let select_data = select_start_month;
    // 判斷月份
    if (String(m_data).length > 1) 
        {
        var select_start = select_start_year + '-' + select_data + '-' + select_start_date;
        var select_end = select_start_year + '-' + select_data + '-' + select_lastDay;
        }
    else
    {
        var select_start = select_start_year + '-' + 0 + select_data + '-' + select_start_date;
        var select_end = select_start_year + '-' + 0 + select_data + '-' + select_lastDay ;
    }

    // console.log(select_start);
    // console.log(select_end);
    $.ajax(
        {
        type: "GET", //we are using GET method to get all record from the server
        url: 'http://210.70.179.173/dash/Model/a_month_in_out.php', // get the route value
        data: { 
            Start_Time: select_start, 
            End_Time : select_end,
        },
        dataType: "json",
            success: function (response) {
                // console.log(response);
                let time = [];
                let in_ = [];
                let out_ = []; 
                for (let i in response)
                {
                    time.push(response[i].time_);
                    in_.push(response[i].in_);
                    out_.push(response[i].out_);
                }

                var ctx = document.getElementById('mycanvas4').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data:
                    {
                        labels: time ,//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        datasets:
                            [
                                {
                                label: '當日進入總人數',
                                data: in_ ,

                                fill: false,
                                borderColor: 'rgba(255,128,51,1.0)',
                                },
                                {
                                label: '當日離開總人數',
                                data: out_,
                                fill: false,
                                borderColor: 'rgba(0, 156, 255, .7)',
                                }
                            ]
                    },
                });
            },
            error: function (response) {
                console.log(response);
            }
        }
    );
}
