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

// Boots up the server using http
server.listen(3000, () => {
	console.log('started on port: ${port}');
});


// Route to manage user logins
app.post('/api/auth', (req, res) => {
	var uname = req.body.username;
	var uemail = req.body.email;
	var urole;
	var userObj;
	console.log(uname);
	console.log(uemail);

	fs.readFile('userdata.json', 'utf8', function(err, data) {
		if (err) {
			console.log(err);
			res.send({
				'username': '',
				'success': false
			});
		} else {
			userObj = JSON.parse(data);
			for (let i = 0; i < userObj.length; i++) {
				if (userObj[i].name == uname) {
					for (let k = 0; k < userObj.length; k++) {
						if (userObj[k].email == uemail) {
							urole = userObj[k].role;
							res.send({
								'username': uname,
								'email': uemail,
								'role': urole,
								'success': true
							});
							console.log(urole);
							return;
						}
					}
				}
			}
			res.send({
				'username': uname,
				'success': false
			});
		}
	});
});




// Route to manage user registration
app.post('/api/reg', (req, res) => {
	var isUser = 0;
	var regUserObj;
	var regUname = req.body.username;
	var regUemail = req.body.email;
	var regUrole = req.body.role;
	console.log(regUname)

	fs.readFile('userdata.json', 'utf-8', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			regUserObj = JSON.parse(data);

			for (let i = 0; i < regUserObj.length; i++) {
				if (regUserObj[i].name == regUname || regUserObj[i].email == regUemail) {
					isUser = 1;
				}
			}

			if (isUser > 0) {
				console.log(req.body);
				res.send({
					'username': '',
					'success': false
				});
			} else {
				regUserObj.push({
					'name': regUname,
					'email': regUemail,
					'role': regUrole
				})
				var newdata = JSON.stringify(regUserObj);
				fs.writeFile('userdata.json', newdata, 'utf-8', function(err) {
					if (err) throw err;
					res.send({
						'username': regUname,
						'email': regUemail,
						'role': regUrole,
						'success': true
					});
				});
			}
		}
	});
});



// Route to delete user
app.post('/api/del', (req, res) => {
	var delUname = req.body.username;
	var isUser = 0;
	var delUserObj;
	console.log(delUname)

	fs.readFile('userdata.json', 'utf-8', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			delUserObj = JSON.parse(data);

			for (let l = 0; l < delUserObj.length; l++) {
				if (delUserObj[l].name == delUname) {
					isUser = 1;
					delete delUserObj[l].name;
					delete delUserObj[l].email;
					delete delUserObj[l].role;
					break;
				}
			}

			if (!isUser) {
				console.log(req.body);
				res.send({
					'success': false
				});
			} else {
				var rawdeldata = delUserObj.filter(o => Object.keys(o).length);
				var newdeldata = JSON.stringify(rawdeldata);
				fs.writeFile('userdata.json', newdeldata, 'utf-8', function(err) {
					if (err) throw err;
					res.send({
						'username': delUname,
						'success': true
					});
				});
			}
		}
	});
});

// Route to get user JSON data
app.post('/api/users', (req, res) => {
	fs.readFile('userdata.json', 'utf-8', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			var userData = JSON.parse(data);
			res.send({
				userData
			});
		}
	});
});

// Route to create new group
app.post('/api/groupreg', (req, res) => {
	var isGroup = 0;
	var regGroupObj;
	var regGname = req.body.groupname;
	console.log(regGname);
	fs.readFile('groupdata.json', 'utf-8', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			regGroupObj = JSON.parse(data);

			for (let f = 0; f < regGroupObj.length; f++) {
				if (regGroupObj[f].name == regGname) {
					isGroup = 1;
				}
			}
			if (isGroup > 0) {
				console.log(req.body);
				res.send({
					'name': '',
					'success': false
				});
			} else {
				regGroupObj.push({
					'name': regGname
				})
				var newGroupData = JSON.stringify(regGroupObj);
				fs.writeFile('groupdata.json', newGroupData, 'utf-8', function(err) {
					if (err) throw err;
					res.send({
						'groupname': regGname,
						'success': true
					});
				});
			}
		}
	});
});

// Route to delete group
app.post('/api/groupdel', (req, res) => {
	var delGname = req.body.groupname;
	var isGroup = 0;
	var delGroupObj;
	console.log('delGname', delGname)

	fs.readFile('groupdata.json', 'utf-8', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			delGroupObj = JSON.parse(data);

			for (let z = 0; z < delGroupObj.length; z++) {
				if (delGroupObj[z].name == delGname) {
					isGroup = 1;
					delete delGroupObj[z].name;
					break;
				}
			}
			if (!isGroup) {
				console.log('reqbody', req.body);
				res.send({
					'success': false
				});
			} else {
				var rawGdeldata = delGroupObj.filter(a => Object.keys(a).length);
				var newGdeldata = JSON.stringify(rawGdeldata);
				fs.writeFile('groupdata.json', newGdeldata, 'utf-8', function(err) {
					if (err) throw err;
					res.send({
						'groupname': delGname,
						'success': true
					});
				});
			}
		}
	});
});


// Route to get group JSON data
app.post('/api/groups', (req, res) => {
	fs.readFile('groupdata.json', 'utf-8', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			var groupData = JSON.parse(data);
			res.send({
				groupData
			});
		}
	});
});


// Route to add user to group
/*app.post('/api/addgroupuser', (req, res) => {
	fs.readFile('userdata.json', 'utf-8', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			var userData = JSON.parse(data);
			res.send({
				userData
			});
		}
	});
});*/
