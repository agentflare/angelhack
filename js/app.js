 Dropzone.options.my-awesome-dropzone = {
    init: function() {
        this.on("success", function(data) {
            var response = $.parseJSON(data.xhr.response);
        });
    }
}