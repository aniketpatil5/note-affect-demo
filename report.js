var isAppInvoked = false;
function invokeApp(){
	var JWTToken = document.getElementById("JWTTokenInput").value.trim();
	console.log('Token :: '  + JWTToken.length)
	if(JWTToken.length == 0){
		alert("Please Enter Valid JWT Token");
	}else{
		console.log("called invokeApp ");
		var url = new URL("nasecapp://");
		url.searchParams.append("allowedDomain", window.location.origin+'');
		url.searchParams.append("token", JWTToken);
		url.searchParams.append("series", '57');
		url.searchParams.append("install", 'develop');
		url.searchParams.append("clientVersion", '1.0');
		url.searchParams.append("submitUrlHost", 'testing.noteaffect.com');
		console.log("invokeApp URL "+ url);
		window.location = url;
		isAppInvoked = true;
		}
	}
	
$(document).ready(function(){	
// 	$( "#dialog" ).dialog({
// 	      autoOpen: false,
// 		  dialogClass: "no-close",
// 		  modal: true,
// 		  buttons: [
// 			{
// 			  text: "Welcome",
// 			  click: function() {				
// 				window.open('https://localhost:3394/welcome', '_blank')
// 				isWindowOpened = true;
// 				isAppInvoked == false;
// 				$( this ).dialog( "close" );
// 			  }
// 			}
// 		  ],
// 	      show: {
// 		effect: "blind",
// 		duration: 1000
// 	      },
// 	      hide: {
// 		effect: "explode",
// 		duration: 1000
// 	      }
//     	});
    //button for get call
    let isErrorShown = false;
    let isWindowOpened = false;
    setInterval(()=>{    
        $.get("https://localhost:3394/ping", function(data, status){
			data = JSON.parse(data);				
			console.log('Ping response : ' + JSON.stringify(data));
			if(data.isError = true){
				var arr = data.errors;
				arr.forEach(function(error){
					if(isErrorShown == false){
					alert( 'Error Occured : ' 
            			+'\n	    Error Code : ' + error.errorCode
						+'\n      Error Desc : ' + error.errorDesc );
					}
				})

				if(arr.length > 0){
				isErrorShown = true;	
				shutdownApp();
				}				
			}
		   
		if(data.isViolation == true){
		   alert('User policy violation detected on your machine');
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
           $.get("https://localhost:3394/getCapturedData", function(data, status){
            console.log('https://localhost:3394/getCapturedData called with status '+ status);
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
        }).fail(function(error) {
		if(error.status == 0 && isWindowOpened == false && isAppInvoked == true){
// 			if(window.open('https://localhost:3394', '_blank'))
// 				isWindowOpened = true;
// 			$( "#dialog" ).dialog( "open" );
			$("#dialog").modal();
		}
            document.getElementById("alive-status").style.color = 'red'
            document.getElementById("alive-status").innerHTML= 'OFF'
            
            document.getElementById("monitoring-status").style.color = 'red'
            document.getElementById("monitoring-status").innerHTML= 'OFF'
        });       
    }, 5000);
});
