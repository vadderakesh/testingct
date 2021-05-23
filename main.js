function get() {
const Http = new XMLHttpRequest();
var contestName=document.getElementById("contest").value;
var timingOption=document.getElementById("timing").value;
var url='https://www.kontests.net/api/v1/';
if(contestName==="All") {
  url='https://www.kontests.net/api/v1/all';
}
else url='https://www.kontests.net/api/v1/'+contestName+'';
Http.open("GET", url);
Http.send();

/* declare all global variables*/
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/* declare all css/class variables */
var divClass="divClass";
var nameClass="nameClass";
var startTimeClass="startTimeClass";
var endTimeClass="endTimeClass";
var durationClass="durationClass";
var linkClass="linkClass";


Http.onreadystatechange = (e) => {
  var json=Http.responseText;
  var object=JSON.parse(json);
  var str="";
  var print="";
  console.log(object);
  // in this json, the main object is an array of objects,so we iterate over each object

   for(var i=0;i<object.length;i++) {
      
        var element=object[i];

        if(element.status===timingOption) {              // checking if timing option synchronizes with the selected one

          //ontain the required elements from each object
          var name=element.name;
          var url=element.url;
          var start_time=element.start_time;
          var end_time=element.end_time;
          var duration=element.duration;

          // format the start-time correspondingly
          var startDate=new Date(start_time);
          var startDay=(startDate.getDay()<10?'0':'')+startDate.getDay();
          var startMonth=monthNames[startDate.getMonth()];
          var startYear=startDate.getFullYear();
          var startHours=(startDate.getHours()<10?'0':'')+startDate.getHours();
          var startMinutes=(startDate.getMinutes()<10?'0':'')+startDate.getMinutes();
          var newFormatStartTime=startDay+" "+startMonth+" "+startYear+" "+startHours+":"+startMinutes+" (UTC+5:30)";


          // format the end-time correspondingly
          var endDate=new Date(end_time);
          var endDay=(endDate.getDay()<10?'0':'')+endDate.getDay();
          var endMonth=monthNames[endDate.getMonth()];
          var endYear=endDate.getFullYear();
          var endMinutes=(endDate.getMinutes()<10?'0':'')+endDate.getMinutes();
          var endHours=(endDate.getHours()<10?'0':'')+endDate.getHours();
          var newFormatEndTime=endDay+" "+endMonth+" "+endYear+" "+endHours+":"+endMinutes+" (UTC+5:30)";

          // format the duration
          var readableDuration=convertSecondsToReadableString(duration);

          //format the url as an hyperlink

          var contestLink="<a href='";
          contestLink+=url+"'>Goto Contest Page</a>";

          // append the each contest details to html
          print+="<div class="+divClass+">";
          
          // append the contest name
          print+="<span class="+nameClass+">"+name+"</span><br>";

          //append the start time
          print+="<span class="+startTimeClass+">"+"Starts At: "+newFormatStartTime+"</span><br>";

          //append the end time
          print+="<span class="+endTimeClass+">"+"Ends At: "+newFormatEndTime+"</span><br>";

          //append the duration
          print+="<span class="+durationClass+">"+"Duration: "+readableDuration+"</span><br>";

          //append the contest url

          print+="<span class="+linkClass+">"+contestLink+"</span><br>";

          //finally clode the div
          print+="</div><br><hr></hr><br>";

          /*    
              console.log(element);
          document.getElementById("output").innerHTML=element.name;
          var myTable= "<table><tr><td style='width: 100px; color: red;'>Col Head 1</td>";
        myTable+= "<td style='width: 100px; color: red; text-align: right;'>Col Head 2</td>";
         myTable+="<td style='width: 100px; color: red; text-align: right;'>Col Head 3</td></tr>";
            myTable+="<tr><td style='width: 100px;                   '>-------------------------</td>";
      myTable+="<td     style='width: 100px; text-align: right;'>--------------------------</td>";
    myTable+="<td     style='width: 100px; text-align: right;'>--------------------------</td></tr>";
    myTable+="<tr><td style='width: 100px;'>Number " + element.name + " is:</td>";
    myTable+="<td style='width: 100px; text-align: right;'>" + element.duration + "</td>";
    var anchorString="<a href='";
    anchorString+=element.url+"'>Go To Contest Page</a>";
    myTable+="<td style='width: 100px; text-align: right;'>"+anchorString+"</td>";
    var date=new Date(element.start_time);
    myTable+="<td tyle='width: 100px; text-align: right;'>"+date.getTime()+"</td>";
    str+=myTable;

         */

      }
  }
   document.getElementById("outputStream").innerHTML=print;
 };
 }

 function convertSecondsToReadableString(seconds) {
  seconds = seconds || 0;
  seconds = Number(seconds);
  seconds = Math.abs(seconds);

  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor(seconds % (3600 * 24) / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 60);
  const parts = [];

  if (d > 0) {
    parts.push(d + ' day' + (d > 1 ? 's' : ''));
  }

  if (h > 0) {
    parts.push(h + ' hour' + (h > 1 ? 's' : ''));
  }

  if (m > 0) {
    parts.push(m + ' minute' + (m > 1 ? 's' : ''));
  }

  if (s > 0) {
    parts.push(s + ' second' + (s > 1 ? 's' : ''));
  }
  return parts.join(" ");
}
