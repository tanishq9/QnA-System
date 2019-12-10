const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
var PdfReader = require("pdfreader").PdfReader;
const { PythonShell } = require("python-shell");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',express.static(__dirname+'/public'));

// Website APIs

app.post(
  "/uploadContentTXT",
  multer({ dest: "./uploads" }).single("file-name"),
  (req, res) => {
    fs.unlinkSync("test.txt");
    fs.readFile(req.file.path, "utf8", function(err, data) {
        console.log(data);
        try {
          fs.writeFileSync("test.txt", data, { flag: "a" });
          res.send("Success");
        } catch (e) {
          console.error(e);
        } 
    });
  }
);

app.post(
  "/uploadContentPDF",
  multer({ dest: "./uploads" }).single("file-name"),
  (req, res) => {
    fs.unlinkSync("test.txt");
    fs.readFile(req.file.path, (err, pdfBuffer) => {
      // pdfBuffer contains the file content
      new PdfReader().parseBuffer(pdfBuffer, function(err, item) {
        if (err) res.send(err);
        else if (!item){
          res.send("Done");
        }  
        else if (item.text) {
          fs.writeFileSync("test.txt", item.text, { flag: "a" });
          console.log(item.text);
        }
      });
    });
  }
);

app.post(
  "/uploadQuestionsTXT", multer({ dest: "./uploads" }).single("file-name"),
  (req, res) => {
    fs.unlinkSync("ques.txt");
    fs.readFile(req.file.path, "utf8", function(err, data) {
        console.log(data);
        try {
          fs.writeFileSync("ques.txt", data, { flag: "a" });
          res.send("Success");
        } catch (e) {
          console.error(e);
        }
    });
  }
);


// Android APIs

app.post(
  "/uploadPDFContentAndroid",
  multer({ dest: "./uploads" }).single("file-name"),
  (req, res) => {
    fs.unlinkSync("test.txt");
    fs.readFile(req.file.path, (err, pdfBuffer) => {
      // pdfBuffer contains the file content
      new PdfReader().parseBuffer(pdfBuffer, function(err, item) {
        if (err) res.send(err);
        else if (!item){
          res.send("Done");
        }  
        else if (item.text) {
          fs.writeFileSync("test.txt", item.text, { flag: "a" });
          console.log(item.text);
        }
      });
    });
  }
);

app.post(
  "/uploadManualQuestionAndroid",
    (req, res) => {
      var obj = req.body;
      var questionString = "";
      for(var key in obj){
        var question = obj[key];
        questionString+=question+"\n";
      }
      console.log(questionString);
      fs.unlinkSync("ques.txt");
      // Write data in 'ques.txt' . 
      fs.writeFile('ques.txt', questionString, (err) => { 
        // In case of a error throw err. 
        if (err) throw err; 
      }) 
      res.send("Done");
});

// Get Answers API

app.get("/getAnswers",(req, res) => {

  console.log('Time to run Python Script');
  let options = {
    "args": ['test.txt','ques.txt'] 
  }
  
  output={};

  PythonShell.run("main_text.py", options, (err, result) => {
      if (err) {
          throw err;
      }
      console.log(result);
      index=0;
      for(i=0;i<result.length;i++){
        output[index++]=result[i];
      }
      res.send(output);
      console.log(output);
  });

});


// Locally run the server
app.listen(3000, () => {
    console.log("Server started");
});
  