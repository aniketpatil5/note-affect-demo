$(document).ready(function(){
	try{
		fetchJwtToken();
	}catch(error){
		console.log(error);
	}
    //button for get call
    let isAppInvoked = 0;
    setInterval(()=>{    
        $.get("http://localhost:3393/ping", function(data, status){
			data = JSON.parse(data);				
			console.log('Ping response : ' + JSON.stringify(data));
			if(data.isError = true){
				var arr = data.errors;
				arr.forEach(function(error){
					alert( 'Error Occured : ' 
            			+'\n	    Error Code : ' + error.errorCode
						+'\n      Error Desc : ' + error.errorDesc );
				})

				//shutdownApp();
			}
				
                document.getElementById("alive-status").style.color = 'green'
                document.getElementById("alive-status").innerHTML = "ON"  
                
                document.getElementById("monitoring-status").style.color = 'green'
                document.getElementById("monitoring-status").innerHTML= 'ON'
            
        }).done(function() {
            console.log("isAppInvoked " + isAppInvoked)
            if (isAppInvoked == 0){
                notifyVisibilityChangeToNativeApp(true)
                isAppInvoked = 1
            }
            $.get("http://localhost:3393/getCapturedData", function(data, status){
            console.log('http://localhost:3393/getCapturedData called with status '+ status);
            eventList = data["events"];
            eventList.forEach(function(obj){
                $('#report-table-body')
                    .append( 
                        '<tr>' +
                            '<td>' + obj["eventType"] + '</td>' +
                            '<td>' + obj["eventMethod"] + '</td>' +
                            '<td>' + obj["eventDate"] + '</td>' +
                            '<td>' + obj["fileName"] + '</td>' +
                            '<td>' + obj["path"] + '</td>' +
                            '<td>' + obj["userDet"] + '</td>' +
                            '<td>' + 'seriesId : '     + obj.contextDet.seriesId +', ' 
							       + 'resourceType : ' + obj.contextDet.resourceType +', '
                                   + 'lectureId : '    + obj.contextDet.item.lectureId +', '
                                   + 'slide : '        + obj.contextDet.item.slide +
                                    '</td>' +
						    '<td>' + obj["detail"] + '</td>' +
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
