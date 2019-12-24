const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  firstname = req.body.firstname;
  lastname = req.body.lastname;
  email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstname,
        LNAME: lastname
      }
    }]
  };

  var jsonData = JSON.stringify(data)

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/fb8aa8e8c5",
    method: "POST",
    headers: {
      "Authorization": "madston 4301094e57b24acd53342c40e891d5a4-us4"
    },
    body: jsonData,
  };
  request(options,function(error,response,body){
    if(error){
        console.log(error);
        res.sendFile(__dirname+"/failure.html");
    }
    else{
      //console.log(response.statusCode);

      if(response.statusCode == 200){
        res.sendFile(__dirname+"/success.html");
      }
      else{
        res.sendFile(__dirname+"/failure.html");
      }

    }
  });

});

app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});

//4301094e57b24acd53342c40e891d5a4-us4

//fb8aa8e8c5
