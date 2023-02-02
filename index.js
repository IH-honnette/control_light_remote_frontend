let changeStateBtn = document.getElementById("changeState");

function readData() {
  console.log("Function reahceee..")
 
   fetch("DB/backend.php")
  .then(response => response.json())
  .then(data => {
    if(data.status =="off") {
      updateUILightOff()
    }else {updateUILightOn()}
  })
  .catch(error => {
      console.error("Error:", error);
  });

  setTimeout(function() {
  readData();
  }, 5000);

 }

function validate(){
        if (document.getElementById('toggleBtn').checked){
            sendOn();
        } else {
        sendOff();
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
  if( document.getElementById('toggleBtn').checked == true){
    console.log("block reached")
    document.getElementById('toggleBtn').checked = false;
  }
}  
function updateUILightOn() {
  document.getElementById("imageStatus").src ="images/light-on.jpg";
  document.getElementById("lightStatus").innerHTML = "ON";
  document.getElementById("lightStatusText").innerHTML = "Light ON";
  if( document.getElementById('toggleBtn').checked == false){
    console.log("block reached")
    document.getElementById('toggleBtn').checked = true;
  }
} 
readData();