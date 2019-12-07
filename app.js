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

app.post("/getAnswers",(req, res) => {
  
    console.log('Time to run Python Script');
  
    let options = {
      "args": ['test.txt','ques.txt'] 
    }
        
    PythonShell.run("main_text.py", options, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send(result);
    });

});


  /*app.post(
    "/uploadPDF",
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
  );*/
  
  app.post(
    "/uploadPDF",
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
    "/uploadTXT", multer({ dest: "./uploads" }).single("file-name"),
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


app.listen(3000, () => {
    console.log("Server started");
});
  