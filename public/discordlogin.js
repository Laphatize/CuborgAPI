function getSearchParameters() {
  var prmstr = window.location.search.substr(1);
  return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}
function transformToAssocArray( prmstr ) {
  var params = {};
  var prmarr = prmstr.split("&");
  for ( var i = 0; i < prmarr.length; i++) {
    var tmparr = prmarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
  }
  return params;
}

var yourId;
setTimeout(doAll, 2000);
function check() {
  if (!code) {
    window.location.href = "./dashboard"
  }
}
var params = getSearchParameters();
var code = params.code;
var accessToken;
if (code) {
  showDash();
  
try {
  localStorage.setItem("code", code);
  var searchParams = 
  
  
  fetch('https://discordapp.com/api/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: searchParams
  }).then(function (response) {
    if (!response.ok) { hideDash(); window.location.href = "./dashboard" }

    return response.json();
  }).then(function(theJson) {
    console.log(theJson.access_token);
    accessToken = theJson.access_token;
    doAll();
    });
  
  check();
  
  
} catch(err) {
  window.location.href = './dashboard'
}
} else {
  hideDash();
}
  
function showDash() {
  document.getElementById("login-message").style.display = "none";
  document.getElementById("login").style.display = "none";
    document.getElementById("dash").style.display = "block"; 
  
    localStorage.setItem("token", accessToken);
  doAll() // this is not executing however when run seperately in the console it seems to work
}
function hideDash() {
  document.getElementById("login-message").style.display = "block";
  document.getElementById("login").style.display = "block"; 
    document.getElementById("dash").style.display = "none"; 
}

function getMyUsername() {
  fetch('https://discordapp.com/api/users/@me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      "Authorization" : `Bearer ${accessToken}`
    }
  }).then(function (response) {
    return response.json();
  }).then(function(theJson) {
    //console.log(theJson)
    document.getElementById("username").innerHTML = theJson.username;
  }
 );
}

function getMyId() {
  fetch('https://discordapp.com/api/users/@me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      "Authorization" : `Bearer ${accessToken}`
    }
  }).then(function (response) {
    return response.json();
  }).then(function(theJson) {
    return theJson.id;
  }
 );
}


function getGuilds() {
  fetch('https://discordapp.com/api/users/@me/guilds', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      "Authorization" : `Bearer ${accessToken}`
    }
  }).then(function (response) {
    return response.json();
  }).then(function(theJson) {
    var i = 0;
    var guilds = [];
    while (i != theJson.length) {
      console.log(theJson[i].name);
      guilds.push(theJson[i].name + "\n");    
      
      i++;

    } //console.log(guilds)
    
    document.getElementById("guilds").innerHTML = guilds;
  }
 );
}


function getMyGuilds() {
  console.log("called")
   fetch('https://discordapp.com/api/users/@me/guilds', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      "Authorization" : `Bearer ${accessToken}`
    }
  }).then(function (response) {
     return response.json();
  }).then(function(theJson) {
     var obj = theJson;
    var  x = 0;
     var z = [];
     while (x != obj.length) {
       if (obj[x].owner == true) {
         z.push(obj[x].name)
         console.log(z)
         x++;
       } else {
         x++;
       }
     }
     document.getElementById('myguilds').innerHTML = z;
    // console.log(theJson[1].owner)
  }
 );
}

function doAll() {
    getMyGuilds();
  getGuilds();
  getMyUsername();
}