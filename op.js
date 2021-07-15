var express = require('express'); var app = express();
const bp=require('body-parser')
var bodyParser = require("body-parser"); app.use(bodyParser.urlencoded({ extended: false }));
var MongoClient = require('mongodb').MongoClient;
const User = require('./dtc.js')
var url = "mongodb://localhost:27017/proj";
app.use(express.static(__dirname));
app.get('/', function (req, res) { res.sendFile(__dirname+"\\"+'index.html');
});
const post=bp.urlencoded({extended:false});
app.post('/mp', function (req, res) {
MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("proj");
 dbo.collection("re").insert({name:req.body.name,email:req.body.email,message:req.body.message,date:Date()}, function(err, res) {
 if (err) throw err;
 db.close();
 });
res.sendFile(__dirname+"\\"+'index.html');
});});
var server = app.listen(5000, function () { console.log('Node server is running..');
});

app.post('/sign-verify',post,async (req,res)=>{
  a="";
 if(req.body.password===req.body.confirmPassword){
 const info = new User({
 name: req.body.name,
 email: req.body.email,
 password: req.body.password
 })
 try{
 const user = await info.save()
 console.log(user)
 a="Registered";
 }
 catch(e){
 console.log(e)
 a="Email Already Registered";
 }
 }
 else{
a="Passwords don't match";
 }
const tml=`<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Sustainable Development</title>
 <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.20.0/axios.min.js" integrity="sha512-quHCp3WbBNkwLfYUMd+KwBAgpVukJu5MncuQaWXgCrfgcxCJAq/fo+oqrRKOj+UKEmyMCG3tb8RB63W+EmrOBg==" crossorigin="anonymous">
 </script>
 <style>
 @import url(https://fonts.googleapis.com/css?family=Roboto:300);
 .login-page {
 width: 360px;
 padding: 8% 0 0;
 margin: auto;
 }
 .form {
 position: relative;
 z-index: 1;
 background: #F4F6F7 ;
 max-width: 360px;
 margin: 0 auto 100px;
 padding: 45px;
 text-align: center;
 boxshadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
 border: solid;
 border-width: 5px;
 border-color: #9ca3e2;
 border-radius: 10px;
 }
 .form input {
 font-family: "Roboto", sans-serif;
 outline: 0;
 background:#ffe6ea;
 width: 100%;
 border: 0;
 margin: 0 0 15px;
 padding: 15px;
 box-sizing: border-box;
 font-size: 14px;
 }
 .form .submit {
 font-family: "Roboto", sans-serif;
 text-transform: uppercase;
 outline: 0;
 background: #b72045;
 width: 100%;
 border: 0;
 padding: 15px;
 color: #FFFFFF;
 font-size: 14px;
 -webkit-transition: all 0.3 ease;
 transition: all 0.3 ease;
 cursor: pointer;
 }
 .form .submit:hover,.form .submit:active,.form .submit:focus {
 background: #24093e;
 }
 .form .message {
 margin: 15px 0 0;
 color: #00003f;
 font-size: 12px;
 }
 .form .message a {
 color: #760842;
 text-decoration: none;
 }
 .form .login-form {
 display: none;
 }
 .container {
 position: relative;
 z-index: 1;
 max-width: 300px;
 margin: 0 auto;
 }
 .container:before, .container:after {
 content: "";
 display: block;
 clear: both;
 }
 .container .info {
 margin: 50px auto;
 text-align: center;
 }
 .container .info h1 {
 margin: 0 0 15px;
 padding: 0;
 font-size: 36px;
 font-weight: 300;
 color: #1a1a1a;
 }
 .container .info span {
 color: #4d4d4d;
 font-size: 12px;
 }
 .container .info span a {
 color: #000000;
 text-decoration: none;
 }
 .container .info span .fa {
 color: #EF3B3A;
 }
 .logout{
 position: fixed;
 top: 5%;
 right: 3%;
 padding: 7px 14px;
 color: #fff;
 cursor: pointer;
 text-decoration: none;
 background-color: transparent;
 border: 1px solid #fff;
 border-radius: 1rem;
 text-transform: uppercase;
 letter-spacing: 1px;
 font-family: "Roboto", sans-serif;
 font-size: 1.4rem;
 }

 body {
   background: #242943;
     font-family: "Roboto", sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
 }
 #error1,#error2{
 color: #000000;
 margin-top: 2%;
 margin-bottom: 0%;
 }
 </style>
</head>
<body>
<button class="logout"><a href="index.html" style="color: white; text-decoration: none;">Home</a></button>
 <div class="login-page">
 <div class="form">
 <form class="register-form" method="Post" autocomplete="off" action="/sign-verify">
 <input type="text" placeholder="Name" name='name' id="name" required>
 <input type="email" placeholder="Email address" name="email" id="email" required>
 <input type="password" placeholder="Password" name="password" id="password" required>
 <input type="password" placeholder="Confirm Password" name="confirmPassword" id="confirmPassword" required>
 <input type='submit' name="submit" value="Create" class="submit"></input>
 <p id="error1">`+a+`</p>
 <p class="message">Already registered? <a href="#">Sign In</a></p>
 </form>
 <form class="login-form" method="Post" autocomplete="off" action="/a">
 <input type="text" placeholder="email" name="email" id="email1"/>
 <input type="password" placeholder="password" name="password" id="password1"/>
 <input type="submit" name="submit" value="Login" class="submit"></input>
 <p class="error2"></p>
 <p class="message">Not registered? <a href="#">Create an account</a></p>
 </form>
 </div>
 </div>
 <script>
 $(".message a").click(function () {
 $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
 });
 </script>
</body>
</html>
`
res.send(tml);
})

app.post('/a',post,async (req,res)=>{
 const user = await User.findUser(req.body.email, req.body.password)
 if(!user){
   const tml= `<!DOCTYPE html>
   <html lang="en">
   <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>19BIT0292</title>
    <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.20.0/axios.min.js" integrity="sha512-quHCp3WbBNkwLfYUMd+KwBAgpVukJu5MncuQaWXgCrfgcxCJAq/fo+oqrRKOj+UKEmyMCG3tb8RB63W+EmrOBg==" crossorigin="anonymous">
    </script>
    <style>
    @import url(https://fonts.googleapis.com/css?family=Roboto:300);
    .login-page {
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
    }
    .form {
    position: relative;
    z-index: 1;
    background: #F4F6F7 ;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    boxshadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    border: solid;
    border-width: 5px;
    border-color: #9ca3e2;
    border-radius: 10px;
    }
    .form input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background:#ffe6ea;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    }
    .form .submit {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #b72045;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    }
    .form .submit:hover,.form .submit:active,.form .submit:focus {
    background: #24093e;
    }
    .form .message {
    margin: 15px 0 0;
    color: #00003f;
    font-size: 12px;
    }
    .form .message a {
    color: #760842;
    text-decoration: none;
    }
    .form .register-form {
    display: none;
    }
    .container {
    position: relative;
    z-index: 1;
    max-width: 300px;
    margin: 0 auto;
    }
    .container:before, .container:after {
    content: "";
    display: block;
    clear: both;
    }
    .container .info {
    margin: 50px auto;
    text-align: center;
    }
    .container .info h1 {
    margin: 0 0 15px;
    padding: 0;
    font-size: 36px;
    font-weight: 300;
    color: #1a1a1a;
    }
    .container .info span {
    color: #4d4d4d;
    font-size: 12px;
    }
    .container .info span a {
    color: #000000;
    text-decoration: none;
    }
    .container .info span .fa {
    color: #EF3B3A;
    }
    body {
      background: #242943;
      font-family: "Roboto", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    #error1,#error2{
    color: #000000;
    margin-top: 2%;
    margin-bottom: 0%;
    }
    .logout{
    position: fixed;
    top: 5%;
    right: 3%;
    padding: 7px 14px;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    background-color: transparent;
    border: 1px solid #fff;
    border-radius: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: "Roboto", sans-serif;
    font-size: 1.4rem;
    }

    </style>
   </head>
   <body>
     <button class="logout"><a href="index.html" style="color: white; text-decoration: none;">Home</a></button>
    <div class="login-page">
    <div class="form">
    <form class="register-form" method="Post" autocomplete="off" action="/sign-verify">
    <input type="text" placeholder="Name" name='name' id="name" required>
    <input type="email" placeholder="Email address" name="email" id="email" required>
    <input type="password" placeholder="Password" name="password" id="password" required>
    <input type="password" placeholder="Confirm Password" name="confirmPassword" id="confirmPassword" required>
    <input type='submit' name="submit" value="Create" class="submit"></input>
    <p id="error1"></p>
    <p class="message">Already registered? <a href="#">Sign In</a></p>
    </form>
    <form class="login-form" method="Post" autocomplete="off" action="/a">
    <input type="text" placeholder="email" name="email" id="email1"/>
    <input type="password" placeholder="password" name="password" id="password1"/>
    <input type="submit" name="submit" value="Login" class="submit"></input>
    <p class="error2">Incorrect Password!</p>
    <p class="message">Not registered? <a href="#">Create an account</a></p>
    </form>
    </div>
    </div>
    <script>
    $(".message a").click(function () {
    $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
    });
    </script>
   </body>
   </html>
`
   res.send(tml);}
   else
 {
 var a=user.name;
var em=user.email;
await MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("proj");
 dbo.collection("re").find({email:em}).toArray
 (function(err, result) {
 if (err) throw err;
 var i=0;
 meg="";
 while(i!=result.length)
 meg+="<tr><td>"+result[i]["message"]+"</td><td>"+result[i++]["date"]+"</td></tr>";
 if(meg=="")
 meg="-------------------------------------DATA NOT FOUND-------------------------------------"
 db.close();
 });
});
await MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("proj");
 dbo.collection("donation").find({email:em}).toArray
 (function(err, result) {
 if (err) throw err;
 var i=0;
 meg1="";
 while(i!=result.length)
 meg1+="<tr><td>"+result[i]["amount"]+"</td><td>"+result[i++]["time"]+"</td></tr>";
  if(meg1=="")
 meg1="-------------------------------------DATA NOT FOUND-------------------------------------"
 db.close();
 });
});
 await MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("proj");
 dbo.collection("coupon").find({email:em}).toArray
 (function(err, result) {
 if (err) throw err;
 var i=0;
 meg3="";
 while(i!=result.length)
 meg3+= "<tr><td>"+result[i]["code"]+"</td><td>"+result[i++]["amount"]+"</td></tr>";
  if(meg3=="")
 meg3=`-------------------------------------DATA NOT FOUND-------------------------------------`
 db.close();
 });
});

 const tml= await `
 <!DOCTYPE HTML>

 <html>

 <head>
 	<title>Sustainable Development</title>
 	<meta charset="utf-8" />
 	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
 	<link rel="stylesheet" href="https://drive.google.com/uc?id=1RbmIU2NczO0slEhm1l4fFC7EfFrx8it5" />
 	<link rel="icon" href="https://www.brookings.edu/wp-content/uploads/2020/01/sdgs.png">

 	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
 	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.4/angular-messages.min.js"></script>
 	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
 	<script src="a.js"></script>
 </head>

 <body class="is-preload">

 	<!-- Wrapper -->
 	<div id="wrapper">

 		<!-- Header -->
 		<header id="header">
 			<a href="index.html" class="logo"><strong> </strong> <span> </span></a>

       <p>`+a+`</p>
       <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</p>
 				<a href="index.html">Log Out</a>

 		</header>

 		<!-- Menu -->


 		<!-- Main -->
 		<div id="main" class="alt">

 			<!-- One -->
 			<section id="one">
 				<div class="inner">


 					<header class="major">
 						<h1>Messages</h1>
 					</header>


           <table>
   <thead>
     <tr>
       <th>Message</th>
       <th>Time</th>
     </tr>
   </thead>
   <tbody>`+meg+`
   </tbody>
   </table>

 <header class="major">
   <h1>Donation</h1>
 </header>


 <table>
 <thead>
 <tr>
 <th>Amount</th>
 <th>Time</th>
 </tr>
 </thead>
 <tbody>
`+meg1+`
 </tbody>
 </table>


 <header class="major">
   <h1>Coupon</h1>
 </header>


 <table>
 <thead>
 <tr>
 <th>Coupon Code</th>
 <th>Amount</th>
 </tr>
 </thead>
 <tbody>
 `+meg3+`
 </tbody>
 </table>

         </div>
 			</section>

 		</div>

 		<!-- Contact -->


 		<!-- Footer -->


 	</div>

 	<!-- Scripts -->
 	<script src="assets/js/jquery.min.js"></script>
 	<script src="assets/js/jquery.scrolly.min.js"></script>
 	<script src="assets/js/jquery.scrollex.min.js"></script>
 	<script src="assets/js/browser.min.js"></script>
 	<script src="assets/js/breakpoints.min.js"></script>
 	<script src="assets/js/util.js"></script>
 	<script src="assets/js/main.js"></script>

 </body>

 </html>


 `

 res.send(tml);
}
});

  app.post('/do',post,async (req,res)=>{
   const user = await User.findUser(req.body.email, req.body.password)
   mdo="";
   if(!user)
   mdo="INVALID CREDENTIALS"
   else{
    mdo="THANKYOU";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("proj");
    dbo.collection("donation").insertOne({email:req.body.email,time:Date(),amount: req.body.amt},
    function(err, res) {
    if (err) throw err;
    db.close();
    });
});
  }
const mkldo=`
<html>

<head>
  <link rel="stylesheet" href="css/style.css">
  <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
  <title>Sign in</title>

<style media="screen">
body {
background-color: #242943;
font-family: 'Ubuntu', sans-serif;
}

.main {
background-color: #FFFFFF;
width: 400px;
height: 500px;
margin: 7em auto;
border-radius: 1.5em;
box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
}

.sign {
padding-top: 40px;
color: #8C55AA;
font-family: 'Ubuntu', sans-serif;
font-weight: bold;
font-size: 23px;
}

.un {
width: 76%;
color: rgb(38, 50, 56);
font-weight: 700;
font-size: 14px;
letter-spacing: 1px;
background: rgba(136, 126, 126, 0.04);
padding: 10px 20px;
border: none;
border-radius: 20px;
outline: none;
box-sizing: border-box;
border: 2px solid rgba(0, 0, 0, 0.02);
margin-bottom: 50px;
margin-left: 46px;
text-align: center;
margin-bottom: 27px;
font-family: 'Ubuntu', sans-serif;
}

form.form1 {
padding-top: 40px;
}

.pass {
  width: 76%;
color: rgb(38, 50, 56);
font-weight: 700;
font-size: 14px;
letter-spacing: 1px;
background: rgba(136, 126, 126, 0.04);
padding: 10px 20px;
border: none;
border-radius: 20px;
outline: none;
box-sizing: border-box;
border: 2px solid rgba(0, 0, 0, 0.02);
margin-bottom: 50px;
margin-left: 46px;
text-align: center;
margin-bottom: 27px;
font-family: 'Ubuntu', sans-serif;
}


.un:focus, .pass:focus {
border: 2px solid rgba(0, 0, 0, 0.18) !important;

}

.submit {
border-radius: 5em;
color: #fff;
background: linear-gradient(to right, #8C55AA, #8C55AA);
padding-left: 40px;
padding-right: 40px;
padding-bottom: 10px;
padding-top: 10px;
font-family: 'Ubuntu', sans-serif;
margin-left: 35%;
font-size: 13px;
}
.logout{
position: fixed;
top: 5%;
right: 3%;
padding: 7px 14px;
color: #fff;
cursor: pointer;
text-decoration: none;
background-color: transparent;
border: 1px solid #fff;
border-radius: 1rem;
text-transform: uppercase;
letter-spacing: 1px;
font-family: "Roboto", sans-serif;
font-size: 1.4rem;
}
</style>


</head>


<body>
  <button class="logout"><a href="index.html" style="color: white; text-decoration: none;">Home</a></button>
  <div class="main">
    <p class="sign" align="center">Sign in</p>
    <form class="form1" method="Post" autocomplete="off" action="/do">
      <input class="un" type="text" align="center" placeholder="Username" name="email" id="email">
      <input class="pass" type="password" align="center" placeholder="Password" name="password" id="password">
      <input class="un" type="int" align="center" placeholder="Cupon Code" name="cc" id="cc">
      <input class="un" type="int" align="center" placeholder="Amount" name="amt" id="amt">
      <button type="submit" name="button" class="submit" align="center">Sign in</button>
      <p align="center">`+mdo+`</p>
      </form>

    </div>

</body>

</html>

`
res.send(mkldo);
});
