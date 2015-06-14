$("#submitLink").click(function() {
    $.ajax({
        url: 'http://127.0.0.1:3000/',
        dataType: "jsonp",
        cache: false,
        jsonpCallback: "_testcb",
        success: function(data) {
			var obj=jQuery.parseJSON(data);
			alert(obj.concepts[0].concept);
			//$("#test").append(obj.message);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
});