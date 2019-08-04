const express = require('express')
const app = express();
const requestx = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const utf8 = require('utf8');
const https = require('https');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect = encodeURIComponent('https://cuborg.xyz/dashboard');
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
app.enable('trust proxy')
app.use(express.static('public'));

const router = express.Router();


app.get('/login', (req, res) => {
  
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
 /* const options = {
    hostname: 'https://discordapp.com/api/v6/oauth2/token',
    port: 443,
    path: '/',
    method: 'POST'
 // };*/


});  


app.get('/ads/new', function(request, response) {
  var email = request.query.email;
  var redirectUrl = request.query.redirecturl;
  var imageUrl = request.query.imageurl;
  
  
fs.writeFile(`ads/${email}.txt`, `Requested by:${email}\nRedirectURL : ${redirectUrl}\nImageURL: ${imageUrl}`, (err) => {
  response.send("good");
  if (err) {
    response.send("bad")
  }
});
  
  
});

app.get('/changePerms', function(request, response) {
  var id = request.query.serverid;
  fs.readFile("db/servers.json", function(err, data) {
  
        console.log(JSON.parse(data)[id]);
        
        response.send(`Verify Cmds: ${JSON.parse(data)[id].verifycmds} | Genere`);
        
    })
  })


app.get('/date', function(request, response) {
  var id = request.query.userid;
  fs.readFile("db/verified.json", function(err, data) {
    var parsedData = JSON.parse(data);
    var username = parsedData.verified[id].username;
    requestx(`https://cubash.com/user/profile/${username}`, function (err, res, body) {
      let $ = cheerio.load(body);
      var dateJoined =  $(".is-pulled-right:nth-child(2)").text();
      //response.send(dateJoined.length)
       console.log(dateJoined.length)
      console.log(dateJoined.trim(dateJoined.length - 10));
      response.send(dateJoined);
    })
  })
})
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/home.html');
//  console.log("User In: " + request.ip);
});

app.get('/admin', function(request, response) {
  if (request.query.password == "icsa33dk") {
  response.sendFile(__dirname + '/db/verified.json');
  } else {
    response.send("bad password")
  }
});


app.get('/press', function(request, response) {
  response.sendFile(__dirname + '/views/finobe.html');
  console.log("User In: " + request.ip);
});
app.get('/dashboard', function(request, response) {
  response.sendFile(__dirname + '/views/dashboard.html');
});
app.get('/tutorial', function(request, response) {
  response.sendFile(__dirname + '/views/tutorial.html');
});
app.get('/invite', function(request, response) {
  response.sendFile(__dirname + '/views/invite.html');
});
app.get('/adsgood', function(request, response) {
  response.sendFile(__dirname + '/views/adgood.html');
});
app.get('/status', function(request, response) {
  response.sendFile(__dirname + '/views/status.html');
});
app.get('/setup', function(request, response) {
  response.sendFile(__dirname + '/views/setup.html');
});
app.get('/verify', function(request, response) {
  response.sendFile(__dirname + '/views/step1.html');
});
app.get('/2', function(request, response) {
  response.sendFile(__dirname + '/views/step2.html');
});
app.get('/3', function(request, response) {
  response.sendFile(__dirname + '/views/step3.html');
});
app.get('/ads', function(request, response) {
  response.sendFile(__dirname + '/views/ads.html');
});

function callback() {
  var x = 1+1;
}
function createCode(arg1, arg2) {
  
fs.writeFile(`db/${arg1}.txt`, arg2, (err) => {
    console.log("✅ New Code Generated : Expires in 5 minutes");
    setTimeout(function () {
         fs.unlink(`db/${arg1}.txt`, callback);
          console.log("destroyed session")
      callback(err)
    }, 300000);
    
}); 
  
  
}

app.get('/createCode', function(request, response) {
  var codeGenerated = makeid(5);
  createCode(request.query.userid, codeGenerated);
  response.send(codeGenerated)
})

app.get('/recent', function(request, response) {
  var blurb;
  requestx(`https://cubash.com/store`, function (error, res, body) {
    let $ = cheerio.load(body);
    blurb = $('.is-3').text();
    var thatstring = blurb.trim().replace(/\n+/g, " ").replace(/ +/g, " ");
    var tmp = thatstring.split(" ");
    tmp.splice(0,1);
    tmp = tmp.join(" ");
    var name = tmp.split(" By ")[0];
    response.send(name)
  })
});
app.get('/checkid', function(request, response) {
  var userid = request.query.userid;
  fs.readFile('db/verified.json', function(err, data){
    try {
      response.send(JSON.parse(data).verified[userid].username)
    } catch(err) {
      response.send("bad")
    }
  });
});
app.get('/getuser', function(request, response) {
  var userid = request.query.userid;
  fs.readFile('db/verified.json', function(err, data) {
    //   console.log(JSON.parse(data).verified['448181621397389322'].username)
    //   console.log(JSON.parse(data).verified[request.query.userid])
    response.send(JSON.parse(data).verified[userid].username);
  })
})
app.get('/pfp', function(request, response) {
  requestx(`https://cubash.com/user/profile/${request.query.username}`, function (error, res, body) {
    let $ = cheerio.load(body);
    var imageURL = $("body").find("img")[1].attribs.src;
    if (imageURL === "/assets/img/icon.png?v=410e76c4b136731b8aab58f8854ced25" || imageURL === "/assets/img/icon-premium.png?v=410e76c4b136731b8aab58f8854ced25") {
        imageURL = $("body").find("img")[2].attribs.src;
    }
    response.send(imageURL)
  });
});  


app.get('/check', function(request, response) {
  
  var blurb;    
  requestx(`https://cubash.com/user/profile/${request.query.username}`, function (error, res, body) {
    let $ = cheerio.load(body);
    blurb = $('#profile_blurb').text();
    var imageURL = $("body").find("img")[1].attribs.src;
    console.log(imageURL  )
    blurb = blurb.substring(0,6).trim(2)
    var originalData;
    var username = request.query.username;
    var userid = request.query.userid;
    //console.log(username, userid, request.query.key)
    
    var database;
    fs.readFile(`db/${userid}.txt`, 'utf8', function(err, datax) {
      
      console.log(datax);
      if ((blurb) === datax) {
      fs.readFile('./db/verified.json', function(err, data) {
       // console.log("text")
        if ((JSON.parse(data).verified[userid])) {
          return response.send("user already exists")
           //fs.unlink(`db/${userid}.txt`, callback);
       //   console.log("destroyed session")
  //    callback(err)
        } else {
          originalData = JSON.parse(data);          
          originalData.verified[userid] = {"username" : username};
          fs.writeFileSync("./db/verified.json", JSON.stringify(originalData, null, 2))
           fs.unlink(`db/${userid}.txt`, callback);
          console.log("destroyed session")
      callback(err)
          return response.send("good");
        }
      })
    } else {
      console.log("invalid code")
      response.send("bad")
    }
    });
    
  })
});
app.get('/onlist', function(request, response) {
  console.log("called")
  var userid = request.query.userid;
  fs.readFile('./db/verified.json', function (err, data) {
    console.log(JSON.parse(data).verified[userid]);
    try {
      if (JSON.parse(data).verified[userid]) {
        response.send("good");
      } else {
        response.send("bad");
      } } catch(err) {response.send("bad");console.log(err)}
  });
});
const listener = app.listen(process.env.PORT, function() {
  console.log('Cuborg Server is running!');
});
