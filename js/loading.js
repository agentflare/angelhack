$("#submitLink").click(function() {
    $("#inputContainer").css("display","none");
    $("#loadingImage").css("display","block");
	
});

$("#my-awesome-dropzone").submit(function(){
	alert("Image submitted");
});

$("document").ready(function(){
	$("document").ajaxComplete(function(){
		$( ".log" ).text( "Triggered ajaxComplete handler." );
	});
	$( ".log" ).text( "Triggered ajaxComplete handler." );
	$("document").ajaxStop(function(){
		$( ".log" ).text( "Triggered ajaxComplete handler." );
	});
	$( ".log" ).text( "Triggered ajaxComplete handler." );
});