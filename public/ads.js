function sendData() {
  var email = document.getElementById("email").value;
  var imageUrl = document.getElementById("imageUrl").value;
  var redirectUrl = document.getElementById("redirectUrl").value;
  
  if (!email | !imageUrl | !redirectUrl) {
    return window.alert("Please make sure you've filled out everything!");
  } else {
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
             // Typical action to be performed when the document is ready:
            // document.getElementById("demo").innerHTML = xhttp.responseText;
          if (xhttp.responseText === "good") {
            window.location.href = "./adsgood"
          } else {
            window.alert("Something went wrong..")
          }
          
        }
    };
    xhttp.open("GET", `https://cuborg.xyz/ads/new?email=${email}&imageurl=${imageUrl}&redirecturl=${redirectUrl}`, true);
    xhttp.send();
    
    
  }
  
  
  
}