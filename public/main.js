$(function(){
    console.log("Document Loaded");
    $("#loader").hide();
    $("#loader3").hide();
    $("#ans").hide();


    $("#pdfSubmit").click(function(){
        $("#pdfSubmit").attr("disabled", true);
        $("#pdfSubmit").css("cursor", "default");
        var formData = new FormData();
        formData.append('file-name', $('#filePDF')[0].files[0]);
        $("#loader").show();
        
        $.ajax({
            url : 'uploadPDF',
            type : 'POST',
            data : formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success : function(data) {
                console.log(data);
                myFunction("Content File Uploaded Successfully")
                $("#pdfSubmit").attr("value", "File Uploaded");
                $("#loader").hide();
            }
        });
    });

    $("#txtSubmit").click(function(){
        $("#txtSubmit").attr("disabled", true);
        $("#txtSubmit").css("cursor", "default"); 
        // $("#loader2").show(); -- avoid showing the loader for text files as they take very little time to get uploaded
        var formData = new FormData();
        formData.append('file-name', $('#fileTXT')[0].files[0]);
        console.log($('#fileTXT')[0].files[0].name);
        $.ajax({
            url : 'uploadTXT',
            type : 'POST',
            data : formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success : function(data) {
                console.log(data);
                $("#loader2").hide();
                myFunction("Question(s) File Uploaded Successfully");
                $("#txtSubmit").attr("value", "File Uploaded");
            }
        });
    });

    $("#answerButton").click(function(){
        $("#loader3").show();
        $.ajax({
            url : 'getAnswers',
            type : 'POST',
            success : function(data) {
                $("#loader3").hide();
                $("#ans").show();
                console.log(data.length);
                var index,output="";
                for(index=1;index<=(data.length-1);index+=2){
                    console.log(data[index]);
                    output+=(data[index]+"<hr>");                    
                }
                $("#ans").html(output);
            }
        });
    });

});


function myFunction(text) {
    var x = document.getElementById("snackbar");
    x.textContent = text
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
}  