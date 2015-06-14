$("#submitLink").click(function() {
    $.ajax({
        url: 'http://127.0.0.1:3000/',
        dataType: "json",
        cache: false,
        success: function(data) {
			alert(data.concepts[0].concept);
			//$("#test").append(obj.message);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
});