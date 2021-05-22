function get() {
const Http = new XMLHttpRequest();
const url='https://clist.by/api/v1/json/contest/?resource__id=2&start_gt=2021-05-20T03:07:43&username=rakhi&api_key=c8cb35a0a9795a719a92602f4578ea9e25d8592c';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  var json=Http.responseText;
  var object=JSON.parse(json);
  var totalContests=object.meta.total_count;
  console.log(object);
  var objectsArray=object.objects;
  for(var i=0;i<100;i++) {
     // document.getElementById("eventName").innerHTML=objectsArray[i].event;
      document.getElementById("eventid").innerHTML=objectsArray[i].id;
  }
 console.log(object);
  document.getElementById("op").innerHTML=totalContests;
  };
  }
