function step1() {
  
  // Configure this
  localStorage.setItem("username", document.getElementById("username").value);
  window.location.href = "./2"
  
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};



localStorage.setItem("userid", getUrlParameter("userid"));


