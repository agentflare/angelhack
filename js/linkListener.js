function setUpNextPage(data){
	
	$("#loadingImage").css("display","none");
	$("#a2").html("<h2><a href="+data.data[0].link+">"+data.data[0].title+"</a></h2> <p>"+data.data[0].pubDate+"</p>");
	$("#a3").html("<h2><a href="+data.data[1].link+">"+data.data[1].title+"</a></h2> <p>"+data.data[1].pubDate+"</p>");
	$("#a4").html("<h2><a href="+data.data[2].link+">"+data.data[2].title+"</a></h2> <p>"+data.data[2].pubDate+"</p>");
	$(".article-container").css("display","block");
	$(".main").css("display","none");
}

$("#submitLink").click(function() {
    $.ajax({
        url: 'http://127.0.0.1:3000/',
        dataType: "json",
        cache: false,
        data: {
            urlData: $("#websiteInput").val(),
        },
        success: function(data) {
			alert(data.data[0].title);
			
			setUpNextPage(data);
			//$("#test").append(obj.message);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
});

$('#submit-all').on('click', function() {
    var files = $('#my-awesome-dropzone').get(0).dropzone.getAcceptedFiles();
    // Do something with the files.
	console.log(typeof files);
    $.ajax({
        url: 'http://127.0.0.1:3000/',
        dataType: "json",
        cache: false,
        data: {
            fileData: JSON.stringify(files)
        },
        success: function(data) {
			alert(data.data[0].title);
			
			setUpNextPage(data);
			//$("#test").append(obj.message);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
});

$("#submit-all").click(function() {
    $.ajax({
        url: 'http://127.0.0.1:3000/',
        dataType: "json",
        cache: false,
        data: {
            urlData: $("#websiteInput").val(),
            fileData: $("#my-awesome-dropzone").val()
        },
        success: function(data) {
			alert(data.data[0].title);
			
			setUpNextPage(data);
			//$("#test").append(obj.message);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
});