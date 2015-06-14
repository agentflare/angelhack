function setUpNextPage(){
	$("#loadingImage").css("display","none");
	$.ajax({
		  url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(FEED_URL),
		  dataType : 'json',
		  success  : function (data) {
			if (data.responseData.feed && data.responseData.feed.entries) {
			  $.each(data.responseData.feed.entries, function (i, e) {
				console.log("------------------------");
				console.log("title      : " + e.title);
				console.log("author     : " + e.author);
				console.log("description: " + e.description);
			  });
			}
		  }
		});
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