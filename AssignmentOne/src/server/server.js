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
  var regUserObj;
  //localhost:3000/api/reg?username=abcdefg
  var regUname = req.body.username;
  var regUemail = req.body.email;
  var regUrole = req.body.role;
  console.log(regUname)

  fs.readFile('userdata.json','utf-8', function(err, data){
      if (err){
          console.log(err);
      } else {
      regUserObj = JSON.parse(data);

      for (let i=0;i<regUserObj.length;i++){
        if (regUserObj[i].name == regUname || regUserObj[i].email == regUemail){
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
         regUserObj.push({'name':regUname,'email':regUemail,'role':regUrole})
         //Prepare data for writing (convert to a string)
         var newdata = JSON.stringify(regUserObj);
         fs.writeFile('userdata.json',newdata,'utf-8',function(err){
           if (err) throw err;
           //Send response that registration was successfull.
           res.send({'username':regUname,'email':regUemail,'role':regUrole,'success':true});
          });
       }
     }
  });
});



//Route to delete user
app.post('/api/del', (req, res) => {
  var delUname = req.body.username;
  var isUser = 0;
  var delUserObj;
  //localhost:3000/api/reg?username=abcdefg
  console.log(delUname)

  fs.readFile('userdata.json','utf-8', function(err, data){
      if (err){
          console.log(err);
      } else {
      delUserObj = JSON.parse(data);

      for (let l=0;l<delUserObj.length;l++){
        if (delUserObj[l].name == delUname){
          //Check for duplicates
          isUser = 1;
          delete delUserObj[l].name;
          delete delUserObj[l].email;
          delete delUserObj[l].role;
          break;
        }
      }

      if (!isUser){
        //Name already exists in the file
        console.log(req.body);
         res.send({'success':false});
       }else{
         //Add name to list of names
         //delUserObj.splice(1,{"name":"deluser1","email":"deluser@foobar.com","role":"user"})
         //Prepare data for writing (convert to a string)
         var newdeldata = JSON.stringify(delUserObj);
         fs.writeFile('userdata.json',newdeldata,'utf-8',function(err){
           if (err) throw err;
           //Send response that registration was successfull.
           res.send({'username':delUname,'success':true});
          });
       }
     }
  });
});


//Route to get user JSON
app.post('/api/users', (req, res) => {
  fs.readFile('userdata.json','utf-8', function(err, data){
    if (err){
        console.log(err);
    }else{
      var userData = JSON.parse(data);
      var userDataString = JSON.stringify(userData);
      res.send({userData});
    }
  });
});
