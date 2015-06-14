function setUpNextPage(){
	
	$("#loadingImage").css("display","none");
	
	$.get(rssurl, function(data) {
		var $xml = $(data);
		$xml.find("item").each(function() {
			var $this = $(this),
				item = {
					title: $this.find("title").text(),
					link: $this.find("link").text(),
					description: $this.find("description").text(),
					pubDate: $this.find("pubDate").text(),
					author: $this.find("author").text()
			}
			alert(item.title);
		});
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
			//alert(data.concepts[0].concept);
			
			setUpNextPage();
			//$("#test").append(obj.message);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
});