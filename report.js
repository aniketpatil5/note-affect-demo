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
	  
			  $.get("http://localhost:3000/getCapturedData", function(data, status){
			console.log('http://localhost:3000/getCapturedData called with status '+ status);
			console.log('Data::' + data);
	 eventList = data["events"];
	 eventList.forEach(function(obj){ 
			$('#report-table-body')
				.append( 
					'<tr>' +
						'<td>' + obj["eventType"] + '</td>' +
						'<td>' + obj["eventMethod"] + '</td>' +
						'<td>' + obj["dateTime"] + '</td>' +
						'<td>' + obj["fileName"] + '</td>' +
						'<td>' + obj["path"] + '</td>' +
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