const express = require("express");
const app = express();
const port = process.env.PORT || 80;
const lineNotify = require('line-notify-nodejs')('fXNljkWjCVJNI67Xig3LnBqXDT1f0BITyUIiEknmJWf');
//const lineNotify = require('line-notify-nodejs')('EXRX6ACTKKL6rVB3wyGPa6xRWBix1ykMMPbu9MCXK8K');

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello! Node.js");
});

app.post('/send', (req, res) => { 
	console.log(req.body)
    let message = JSON.stringify(req.body);
    message = message.toString().replace("{\"","").replace("\\u0000\":\"\"}","")
    console.log(message)
    //TYPE|คู่เงิน|PROP1|...|PROPx
    let messageNoti = "";
    let splitMessage = message.split("|");
    for(let i=0;i<splitMessage.length;i++){
    	messageNoti = messageNoti+splitMessage[i];
    	if(i!=(splitMessage.length-1)){
    		messageNoti = messageNoti +"\n";
    	}
    }
    
	lineNotify.notify({
	  message: messageNoti,
	}).then(() => {
	  console.log('send completed!');
	});
  res.send("200")
})

app.listen(port, () => {
  console.log("Starting node.js at port " + port);
});
