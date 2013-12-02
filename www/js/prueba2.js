


var API_BASE_URL = "http://localhost:8080/beeter-api";


$(document).ready(function(e){
	//e.preventDefault();
	getStingsList();
});


$("#button_post_sting").click(function(e){
	e.preventDefault();
	var msg = $('#msg_sting').val();
	var sub = $('#sub_sting').val();
	var username = 'alicia';
	var sting = '{"content": "'+ msg +'","subject": "'+ sub +'","username": "'+ username +'"}';
createSting(sting);
});
function handleEnter (field, event) {
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode == 13) {
    	var msg = $('#msg_sting').val();
	var sub = $('#sub_sting').val();
	var username = 'alicia';
	var sting = '{"content": "'+ msg +'","subject": "'+ sub +'","username": "'+ username +'"}';
        createSting(sting)
        return false;
    }
    else
    return true;

$("#button_update").click(function(e){
	
	updateSting(sting_id, sting);
});
} 
$("#button_search").click(function(e){
	e.preventDefault();
	getStingsSearch();
});







function getStingsList() {
	var url = API_BASE_URL + '/stings?offset=0&length=6';
	
	$.ajax({
		url : url,
		type : 'GET',
		headers : {
			"Accept" : "application/vnd.beeter.api.sting.collection+json"
		},
		crossDomain : true,
		beforeSend: function (request)
		{
			request.withCredentials = true;
			request.setRequestHeader("Authorization", "Basic "+ btoa('alicia:alicia'));
		},
		
		success : function(data, status, jqxhr) {
			var response = $.parseJSON(jqxhr.responseText);
			var links = response.links;
			$.each(links, function(i,v){
				var link = v;
				console.log(v.uri);			
			});
			
			var stings = response.stings;
			var htmlString = "";
			

			$.each(stings, function(i,v){
				var sting = v;
				var i=0;
				if (i==0){
					htmlString += '<div class="panel panel-danger"><div class="panel-heading">  <span class="label label-primary">'+sting.username
					htmlString += '</span> <h3 class="panel-title">'+sting.subject;
					htmlString += '</h3> </div><div class="panel-body">'+sting.content;
					htmlString += '</div><a href="#" onClick="deleteSting('+sting.stingid;
					htmlString+=')"; class="btn btn-xs btn-danger">Eliminar</a>';
					htmlString += '<a data-toggle="modal" href="#addWidgetModal" type="submit" href="#" onClick="editSting('+sting.stingid; 
					htmlString += ')"class="btn btn-success btn-xs">Editar</a><hr>'
					i++;}

					if(i==6){
						htmlString += '</div>';
					}
				})

			$('#stingsshow').html(htmlString);

		},
		error : function(jqXHR, options, error) {
			//callbackError(jqXHR, options, error);
		}
	});
}

function createSting(sting) {
	var url = API_BASE_URL + '/stings';
 
	$.ajax({
        url: url,
		type : 'POST',
		crossDomain : true,
		data : sting,
		headers : {
			"Accept" : "application/vnd.beeter.api.sting+json",
			"Content-Type" : "application/vnd.beeter.api.sting+json"
		},
		beforeSend: function (request)
	    {
	        request.withCredentials = true;
	        request.setRequestHeader("Authorization", "Basic "+ btoa('alicia:alicia'));
	        
	    },
	})
	.done(function (data, status, jqxhr) {
		console.log(status);
		location.reload();
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
		username : 'alicia',
		password : 'alicia',
	})
    .done(function (data, status, jqxhr) {
    	alert("Sting "+stingid+" eliminado")
		console.log(status);
		location.reload();
	})
    .fail(function (jqXHR, textStatus) {
		console.log(textStatus);
		alert("No tienes permisos suficientes");
	});
		
}
function editSting(stingid) {
	var url = API_BASE_URL + '/stings/'+stingid;
 
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		beforeSend: function (request)
	    {
	        request.withCredentials = true;
	        request.setRequestHeader("Authorization", "Basic "+ btoa('alicia:alicia'));
	    },
	})
	.done(function (data, status, jqxhr) {
		var sting = $.parseJSON(jqxhr.responseText);
		console.log(sting);
		var htmlModal= "";
		htmlModal += '<div class="form-group pull-left"><span class="label label-default"></span><input id="up_sting" type="text" class="form-control" value="'+sting.subject;
		htmlModal += '"></div><div class="form-group"></div><div class="form-group pull-right"><br><br><table class="table"><tbody><tr></tr></tbody></table></div><div class="form-group"><div><br></div><div><br></div><div><br><span class="label label-default">';
		htmlModal += '</span></div><textarea id="upmsg_sting" class="form-control">'+sting.content;
		htmlModal += '</textarea></div><button type="submit" class="btn btn-primary" onClick="updateSting()";>Actualizar!</button><div id="upid_sting" class="hidden" value="'+sting.stingid+'" >'+sting.stingid+'</div>';
		$('#modalshow').html(htmlModal);

	})
    .fail(function (jqXHR, textStatus) {
		console.log(textStatus);
	});

}

function updateSting() {
	
	var msg = $('#upmsg_sting').val();
	var sub = $('#up_sting').val();
	var username = 'alicia';
	var sting_id = $('#upid_sting').text();
	console.log("SSS:" +sting_id);
	var sting = '{"content": "'+ msg +'","subject": "'+ sub +'","username": "'+ username +'"}';

	var url = API_BASE_URL + '/stings/'+sting_id;
	console.log(url);
		

		$.ajax({
        url: url,
		type : 'PUT',
		crossDomain : true,
		data : sting,
		headers : {
			"Accept" : "application/vnd.beeter.api.sting+json",
			"Content-Type" : "application/vnd.beeter.api.sting+json"
		},
		beforeSend: function (request)
	    {
	        request.withCredentials = true;
	        request.setRequestHeader("Authorization", "Basic "+ btoa('alicia:alicia'));
	        
	    },
	})
	.done(function (data, status, jqxhr) {
		console.log(status);
		location.reload();
	})
    .fail(function (jqXHR, textStatus) {
		console.log(textStatus);
	});
	
}

function getStingsSearch(){
	var url = '';
	var option = $('#option_search').val();
	if(option=="user"){
		var username = $('#text_search').val();
		url = API_BASE_URL + '/stings?username='+username+'&offset=0&length=6';

		$.ajax({
		url : url,
		type : 'GET',
		headers : {
			"Accept" : "application/vnd.beeter.api.sting.collection+json"
		},
		crossDomain : true,
		beforeSend: function (request)
	    {
	        request.withCredentials = true;
	        request.setRequestHeader("Authorization", "Basic "+ btoa('alicia:alicia'));
	    },
 
		success : function(data, status, jqxhr) {
			var response = $.parseJSON(jqxhr.responseText);
			var links = response.links;
			$.each(links, function(i,v){
			var link = v;
				console.log(v.uri);			
			});
 
			var stings = response.stings;
			var htmlString = '<div class="page-header"><h3>Publicaciones del usuario: '+ username +'</h3></div>';
		
			

			$.each(stings, function(i,v){
				var sting = v;
				var i=0;
				if (i==0){
					htmlString += '<div class="panel panel-danger"><div class="panel-heading">  <span class="label label-primary">'+sting.username
					htmlString += '</span> <h3 class="panel-title">'+sting.subject;
					htmlString += '</h3> </div><div class="panel-body">'+sting.content;
					htmlString += '</div><a href="#" onClick="deleteSting('+sting.stingid;
					htmlString+=')"; class="btn btn-xs btn-danger">Eliminar</a>';
					htmlString += '<a data-toggle="modal" href="#addWidgetModal" type="submit" href="#" onClick="editSting('+sting.stingid; 
					htmlString += ')"class="btn btn-success btn-xs">Editar</a><hr>'
					i++;}

					if(i==6){
						htmlString += '</div>';
					}
				})

			$('#stingsshow').html(htmlString);

		},
		error : function(jqXHR, options, error) {
			
			//callbackError(jqXHR, options, error);
		}
	});
	}else{
		var pattern = $('#text_search').val();
		url = API_BASE_URL + '/stings?pattern='+pattern+'&offset=0&length=6';

				$.ajax({
		url : url,
		type : 'GET',
		headers : {
			"Accept" : "application/vnd.beeter.api.sting.collection+json"
		},
		crossDomain : true,
		beforeSend: function (request)
	    {
	        request.withCredentials = true;
	        request.setRequestHeader("Authorization", "Basic "+ btoa('alicia:alicia'));
	    },
 
		success : function(data, status, jqxhr) {
			var response = $.parseJSON(jqxhr.responseText);
			var links = response.links;
			$.each(links, function(i,v){
			var link = v;
				console.log(v.uri);			
			});
 
			var stings = response.stings;
			var htmlString = '<div class="page-header"><h3>Resultados que contienen: '+ pattern +'</h3></div>';
			

	            $.each(stings, function(i,v){
				var sting = v;
				var i=0;
				if (i==0){
					htmlString += '<div class="panel panel-danger"><div class="panel-heading">  <span class="label label-primary">'+sting.username
					htmlString += '</span> <h3 class="panel-title">'+sting.subject;
					htmlString += '</h3> </div><div class="panel-body">'+sting.content;
					htmlString += '</div><a href="#" onClick="deleteSting('+sting.stingid;
					htmlString+=')"; class="btn btn-xs btn-danger">Eliminar</a>';
					htmlString += '<a data-toggle="modal" href="#addWidgetModal" type="submit" href="#" onClick="editSting('+sting.stingid; 
					htmlString += ')"class="btn btn-success btn-xs">Editar</a><hr>'
					i++;}

					if(i==6){
						htmlString += '</div>';
					}
				})

			$('#stingsshow').html(htmlString);

		},
		error : function(jqXHR, options, error) {
			//callbackError(jqXHR, options, error);
		}
	});
	}	
}