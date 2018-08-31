let express = require('express')
let app = express();
let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);
let fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3000;

require('./socket.js')(app, io);

server.listen(3000, () => {
  console.log('started on port: ${port}');
});

//Route to manage user logins
app.post('/api/auth', (req, res) => {
// localhost:3000/api/auth?usename=Terry
  var uname = req.body.username;
  var uemail = req.body.email;
  var urole;
  var userObj;
  console.log(uname);
  console.log(uemail);

  fs.readFile('userdata.json', 'utf8', function(err, data){
      if (err) {
          console.log(err);
          //Some error happended opening the file. No Success
          res.send({'username':'','success':false});
      } else {
      userObj = JSON.parse(data);
      for (let i=0;i<userObj.length;i++){
        if (userObj[i].name == uname){
          //find first instance of user name and success
          for (let k=0;k<userObj.length;k++){
            if (userObj[k].email == uemail){
              urole = userObj[k].role;
              res.send({'username':uname,'email':uemail,'role':urole,'success':true});
              console.log(urole);
              return;
            }
          }
        }
      }
      //no username was found that matched
      res.send({'username':uname,'success':false});
  }});
});




//Route to manage user registration
app.post('/api/reg', (req, res) => {
  var isUser = 0;
  var userObj;
  //localhost:3000/api/reg?username=abcdefg
  var uname = req.query.username;

  fs.readFile('userdata.json','utf-8', function(err, data){
      if (err){
          console.log(err);
      } else {
      userObj = JSON.parse(data);
      for (let i=0;i<userObj.length;i++){
        if (userObj[i].name == uname){
          //Check for duplicates
          isUser = 1;
        }
      }
      if (isUser > 0){
        //Name already exists in the file
        console.log(req.body);
         res.send({'username':'','success':false});
       }else{
         //Add name to list of names
         userObj.push({'name':uname})
         //Prepare data for writing (convert to a string)
         var newdata = JSON.stringify(userObj);
         fs.writeFile('userdata.json',newdata,'utf-8',function(err){
           if (err) throw err;
           //Send response that registration was successfull.
           res.send({'username':uname,'success':true});
          });
       }
     }
  })
})

//Route to delete user
app.post('/api/del', (req, res) => {
})
