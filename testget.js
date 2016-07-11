var data = "name=WelpThereWeGo&city=Portland&state=OR&noGuests=3&price=33&id=5783434597aaa811002c5d26&key=ceY9rtrmrI";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "http://localhost:3000/all");
xhr.setRequestHeader("content-type", "text/plain");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "634e5d8a-2a18-97b2-cb15-9a19dfc3af50");

xhr.send(data);
