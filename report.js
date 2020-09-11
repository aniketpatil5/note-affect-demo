$(document).ready(function(){

//button for get call


setInterval(()=>{

 $.get("http://localhost:3000/isAlive", function(data, status){
	  console.log('is appAlive : ' + data);
	  if(data == true){
					document.getElementById("alive-status").style.color = 'green'
					document.getElementById("alive-status").innerHTML = "ON"  
					
					document.getElementById("monitoring-status").style.color = 'green'
					document.getElementById("monitoring-status").innerHTML= 'ON'
	  }
  }).done(function() {
	  
			  $.get("http://localhost:3001/getCapturedData", function(data, status){
	  console.log('http://localhost:3001/getCapturedData called with status '+ status);
	 eventList = data["events"];
	 eventList.forEach(function(obj){ 
			 var parsedObj = JSON.parse(obj);
			$('#report-table-body')
				.append( 
					'<tr>' +
						'<td>' + parsedObj["eventType"] + '</td>' +
						'<td>' + parsedObj["dateTime"] + '</td>' +
						'<td>' + parsedObj["path"] + '</td>' +
					'</tr>' );
					
					//to setup scroll to the bottom
					var objDiv = document.getElementById("report-table-div");
					objDiv.scrollTop = objDiv.scrollHeight;
					
	 });
  });
  }).fail(function() {
					document.getElementById("alive-status").style.color = 'red'
					document.getElementById("alive-status").innerHTML= 'OFF'
					
					document.getElementById("monitoring-status").style.color = 'red'
					document.getElementById("monitoring-status").innerHTML= 'OFF'
	});
	
}, 1000);
 
});