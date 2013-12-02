var API_BASE_URL = "http://localhost:8080/beeter-api";
 
 
$("#button_get_sting").click(function(e){
	e.preventDefault();
	getSting(85);
});
 
$("#button_delete_sting").click(function(e){
	e.preventDefault();
	deleteSting(109);
});
 
$("#button_post_sting").click(function(e){
	e.preventDefault();
	var sting ='{"content": "Funciona ajax!!!!","subject": "Prueba ajax","username": "blas"}';
	createSting(sting);
});
 
 
function getSting(stingid) { 
	var url = API_BASE_URL + '/stings/'+stingid;
 
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		username : 'alicia',
		password : 'alicia',
	})
	.done(function (data, status, jqxhr) {
		var sting = $.parseJSON(jqxhr.responseText);
		console.log(sting);
	})
    .fail(function (jqXHR, textStatus) {
		console.log(textStatus);
	});
 
}
 
function deleteSting(stingid) {
	var url = API_BASE_URL + '/stings/'+stingid;
 
	$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,
		username : 'blas',
		password : 'blas',
	})
    .done(function (data, status, jqxhr) {
		console.log(status);
	})
    .fail(function (jqXHR, textStatus) {
		console.log(textStatus);
	});
		
}
 
 
function createSting(sting) {
	var url = API_BASE_URL + '/stings';
 
	$.ajax({
      // dataType: "jsonp",
        url: url,
		// url : url,
		type : 'POST',
		crossDomain : true,
		data : sting,
		//dataType : 'json',
		username : 'blas',
		password : 'blas',
		headers : {
			"Accept" : "application/vnd.beeter.api.sting+json",
			"Content-Type" : "application/vnd.beeter.api.sting+json"
			
				
		},
	})
	.done(function (data, status, jqxhr) {
		console.log(status);
	})
    .fail(function (jqXHR, textStatus) {
		console.log(textStatus);
	});
}