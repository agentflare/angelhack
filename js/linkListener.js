function setUpNextPage(){
	$("#loadingImage").css("display","none");
}

$("#submitLink").click(function() {
    $.ajax({
        url: 'http://127.0.0.1:3000/',
        dataType: "json",
        cache: false,
        data: {
            urlData: $("#websiteInput").val(),
            fileData: $("#my-awesome-dropzone").val()
        },
        success: function(data) {
			alert(data.concepts[0].concept);
			
			setUpNextPage();
			//$("#test").append(obj.message);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
});