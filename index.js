let changeStateBtn = document.getElementById("changeState");

function validate(){
        if (document.getElementById('toggleBtn').checked){
            sendOn();
            updateUILightOn();
        } else {
        sendOff();
        updateUILightOff();
        }
}
function sendOn(){
    var details = {
    'state': 'on'
};

var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      fetch('backend.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      })
}
function sendOff(){
     var details = {
    'state': 'off'
};

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      fetch('backend.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }) 
}

function updateUILightOff() {
  document.getElementById("imageStatus").src ="images/light-off.jpg";
  document.getElementById("lightStatus").innerHTML = "OFF";
  document.getElementById("lightStatusText").innerHTML = "Light OFF";
}  
function updateUILightOn() {
  document.getElementById("imageStatus").src ="images/light-on.jpg";
  document.getElementById("lightStatus").innerHTML = "ON";
  document.getElementById("lightStatusText").innerHTML = "Light ON";
}  