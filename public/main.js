$(function(){
    console.log("Document Loaded");
    $("#loader").hide();
    $("#loader3").hide();
    $("#ans").hide();

    // Submit Content File to Server
    $("#pdfSubmit").click(function(){
        var formData = new FormData();
        formData.append('file-name', $('#filePDF')[0].files[0]);
        var fileName = $('#filePDF')[0].files[0].name;
        console.log(fileName);
        var extension = fileName.substr(fileName.length-3,fileName.length);
        if(extension=="pdf"){
            console.log("PDF Content File");
            $("#pdfSubmit").attr("disabled", true);
            $("#pdfSubmit").css("cursor", "default");
            $("#loader").show();
            $.ajax({
                url : 'uploadContentPDF',
                type : 'POST',
                data : formData,
                processData: false,  // tell jQuery not to process the data
                contentType: false,  // tell jQuery not to set contentType
                success : function(data) {
                    console.log(data);
                    myFunction("Content File Uploaded Successfully")
                    $("#pdfSubmit").attr("value", "File Uploaded");
                    $("#loader").hide();
                    $("#filePDF").prop("disabled",true);
                }
            });
        }else if(extension=="txt"){
            console.log("TXT Content File");
            $("#pdfSubmit").attr("disabled", true);
            $("#pdfSubmit").css("cursor", "default");
            $("#loader").show();
            $.ajax({
                url : 'uploadContentTXT',
                type : 'POST',
                data : formData,
                processData: false,  // tell jQuery not to process the data
                contentType: false,  // tell jQuery not to set contentType
                success : function(data) {
                    console.log(data);
                    myFunction("Content File Uploaded Successfully")
                    $("#pdfSubmit").attr("value", "File Uploaded");
                    $("#loader").hide();
                    $("#filePDF").prop("disabled",true);
                }
            });
        }else{
            myFunction("File Format NOT Supported")
        } 
    });


    // Submit Questions File to Server
    $("#txtSubmit").click(function(){
        // $("#loader2").show(); -- avoid showing the loader for text files as they take very little time to get uploaded
        var formData = new FormData();
        formData.append('file-name', $('#fileTXT')[0].files[0]);
        var fileName = $('#fileTXT')[0].files[0].name;
        console.log(fileName);
        var extension = fileName.substr(fileName.length-3,fileName.length);
        if(extension=="txt"){
            console.log("TXT Questions File");
            $("#txtSubmit").attr("disabled", true);
            $("#txtSubmit").css("cursor", "default"); 
            $.ajax({
                url : 'uploadQuestionsTXT',
                type : 'POST',
                data : formData,
                processData: false,  // tell jQuery not to process the data
                contentType: false,  // tell jQuery not to set contentType
                success : function(data) {
                    console.log(data);
                    $("#loader2").hide();
                    myFunction("Questions File Uploaded Successfully");
                    $("#txtSubmit").attr("value", "File Uploaded");
                    $("#fileTXT").prop("disabled",true);
                }
            });
        }else{
            myFunction("File Format NOT Supported")
        } 
    });

    // Submit 'Answer' Request to Server
    $("#answerButton").click(function(){
        if($("#txtSubmit").attr("value")=="File Uploaded"  &&  $("#pdfSubmit").attr("value") == "File Uploaded"){
            $("#loader3").show();
            $("#answerButton").attr("disabled", true);
            $("#answerButton").css("cursor", "default");
            $.ajax({
                url : 'getAnswers',
                type : 'GET',
                success : function(data) {
                    $("#loader3").hide();
                    $("#ans").show();
                    var index,length=Object.keys(data).length,output="";
                    console.log(length);
                    for(index=1;index<length;index+=2){
                        console.log(data[index]);
                        output+=(data[index]+"<hr>");                          
                    }
                    $("#ans").html(output);
                    $("#answerButton").attr("disabled", false);
                    $("#answerButton").css("cursor", "pointer");
                }
            });
        }else{
            myFunction("Upload All Files");
        }
    });

});


function myFunction(text) {
    var x = document.getElementById("snackbar");
    x.textContent = text
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
}  