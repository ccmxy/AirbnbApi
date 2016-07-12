var request = require("request");
var options = { method: 'PUT',
  url: 'http://localhost:3000/update',
  headers:
   {
     'cache-control': 'no-cache',
     'content-type': 'application/x-www-form-urlencoded' },
  form:
   { appid: 'oUWHvfC6uD',
     name: 'MyTestRequest',
     city: 'Cityville',
     state: 'Statemont',
     noGuests: '3',
     price: '33',
     id: '57842439de3497cc1c635641' }
   };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
