const express = require("express");
const request = require("request");

const bodyParser = require("body-parser");
const https = require("https");
const http = require("http");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us19.api.mailchimp.com/3.0/lists/33aec2a97f";

  const options = {
    method: "POST",
    auth: "zehra1:9d90fbdf842ac79465c9cb8957655988-us19"
  };

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname +  "/success.html");
    } else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
      console.log(request);
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/")
})

app.listen(process.env.PORT  || 3000, function(){
  console.log("Server is running on port 3000");
})

//api key
//9d90fbdf842ac79465c9cb8957655988-us19
//
//9d90fbdf842ac79465c9cb8957655988 - us19
//id
//33aec2a97f

//33aec2a97f
