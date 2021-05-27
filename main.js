
/* 
  function which gets invoked when user clicks om fetch
  two jobs :
    flushes the existing data
    calls the respective function ti generate data

*/

function loadTheData() {
  document.getElementById("outputStream").innerHTML="";
  executeAndDisplay();
}



/* 
   function to handle  the APi request and generate the html for output
*/

function executeAndDisplay() {
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
var alertClass="alertClass";

/* make request to API */

Http.onreadystatechange = (e) => {
  var jsonData=Http.responseText;
  var object=JSON.parse(jsonData);
  var str="";
  var bufferString="";
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
          var startDay=(startDate.getDate()<10?'0':'')+startDate.getDate();
          var startMonth=monthNames[startDate.getMonth()];
          var startYear=startDate.getFullYear();
          var startHours=(startDate.getHours()<10?'0':'')+startDate.getHours();
          var startMinutes=(startDate.getMinutes()<10?'0':'')+startDate.getMinutes();
          var newFormatStartTime=startDay+" "+startMonth+" "+startYear+" "+startHours+":"+startMinutes+" (UTC+5:30)";


          // format the end-time correspondingly
          var endDate=new Date(end_time);
          var endDay=(endDate.getDate()<10?'0':'')+endDate.getDate();
          var endMonth=monthNames[endDate.getMonth()];
          var endYear=endDate.getFullYear();
          var endMinutes=(endDate.getMinutes()<10?'0':'')+endDate.getMinutes();
          var endHours=(endDate.getHours()<10?'0':'')+endDate.getHours();
          var newFormatEndTime=endDay+" "+endMonth+" "+endYear+" "+endHours+":"+endMinutes+" (UTC+5:30)";

          // format the duration
          var readableDuration=convertTimeInSecondstoNormalFormat(duration);

          //format the url as an hyperlink

          var contestLink="<a href='";
          var blank="_blank";
          var  rel="noreferrer noopener";
          contestLink+=url+"' target="+blank+" rel="+rel+">Goto Contest Page</a>";
          

          // append the each contest details to html
          bufferString+="<div class="+divClass+">";
          
          // append the contest name
          bufferString+="<span class="+nameClass+">"+name+"</span><br>";

          //append the start time
          bufferString+="<span class="+startTimeClass+">"+"Starts At: "+newFormatStartTime+"</span><br>";

          //append the end time
          bufferString+="<span class="+endTimeClass+">"+"Ends At: "+newFormatEndTime+"</span><br>";

          //append the duration
          bufferString+="<span class="+durationClass+">"+"Duration: "+readableDuration+"</span><br>";

          //append the contest url

          bufferString+="<span class="+linkClass+">"+contestLink+"</span><br>";

          //finally clode the div
          bufferString+="</div><br><hr></hr><br>";

          // deprecated code---will be removed in next fix after peer review

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

  //  handle the failed URL's call

  if(bufferString==="" || bufferString.length===0) {
    var message="Oops, no contests are available .Try after some time :)"
    var emptyMessage="<span class="+alertClass+">"+message+"</span><br>";
    document.getElementById("outputStream").innerHTML=emptyMessage;
  }
  else {
   document.getElementById("outputStream").innerHTML=bufferString;
  }
 };
 }

/*
 function to handle the conversio of time in seconds to normak format

*/

 function convertTimeInSecondstoNormalFormat(timeInSeconds) {
  timeInSeconds = timeInSeconds || 0;
  timeInSeconds = Number(timeInSeconds);
  timeInSeconds = Math.abs(timeInSeconds);

  const days = Math.floor(timeInSeconds / (3600 * 24));
  const hrs = Math.floor(timeInSeconds % (3600 * 24) / 3600);
  const min = Math.floor(timeInSeconds % 3600 / 60);
  const sec = Math.floor(timeInSeconds % 60);
  const parts = [];

  if (days > 0) {
    parts.push(days + ' day' + (days > 1 ? 's' : ''));
  }

  if (hrs > 0) {
    parts.push(hrs + ' hour' + (hrs > 1 ? 's' : ''));
  }

  if (min > 0) {
    parts.push(min + ' minute' + (min > 1 ? 's' : ''));
  }

  if (sec > 0) {
    parts.push(sec + ' second' + (sec > 1 ? 's' : ''));
  }
  return parts.join(" ");
 }
