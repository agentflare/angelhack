$("#submitLink").click(function() {
    $("#inputContainer").css("display","none");
    $("#loadingImage").css("display","block");
	
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