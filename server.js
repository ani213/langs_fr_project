var express = require('express');
var app = express();
let modelInit=require("./models/init");
var bodyParser = require('body-parser');
var routes=require('./routes');
var cors = require('cors');
var auth=require("./auth")();
app.use(cors())
modelInit();
app.use(bodyParser.json());
app.use("/uploads",express.static('uploads'));


let router=express.Router()
routes(router,auth);

app.use('/app',router)

const PORT=process.env.PORT||8080
app.listen(PORT,console.log(`server start:#${PORT}`));
