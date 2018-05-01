# node-textmarketer

 A very simple promise based node.js wrapper around axios and qs for posting to api of textmarketer.

 This is for sending SMS via textmarketer.

##### Installation

npm install node-textmarketer

##### Example usage

```
var textmarketer = require("node-textmarketer");

var username = "yourUsername";
var password = "yourPassword";

var sms = new textmarketer(username, password);


sms.send({
    "to": '01234123476',            //the number you are sending to 
    "message": 'test message',      // your message
    "orig": 'TESTER'                // the name of the sender
}).then(response => {
    console.log("sms sent ok");
    console.log(response);
    //your success code ....

}).catch(response => {
    console.log("SMS SENDING ERROR");
    console.log(response);
    //your fail code ....
})
 ```

If the response is successful will be a JSON object in the form:
{"status" : "ok", "balance" : 100}

where balance is the remaining credits.

the response if fail will be

{"status" : "error", "error" : "the error text returned from api here"}
