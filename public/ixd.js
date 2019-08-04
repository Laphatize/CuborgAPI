
  function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

  //var code = makeid(5);
var code;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
         document.getElementById("blurb").innerHTML  = xhttp.responseText;
    }
};
xhttp.open("GET", `https://cuborg.xyz/createCode?userid=${localStorage.getItem("userid")}`, true);
xhttp.send();



function step2() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText);
        
        if (xhttp.responseText === "good") {
          
          window.location.href = "./3";
        } else {
          window.alert("That didn't work...")
          window.location.reload();
        }
        
        
      }
  };
  xhttp.open("GET", `./check?username=${localStorage.getItem("username")}&key=${code}&userid=${localStorage.getItem("userid")}`, true);
  xhttp.send();
}