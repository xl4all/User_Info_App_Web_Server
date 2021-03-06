///////////////////////////////////////////
// User Information App - Web Server

// Create a Node.js application that is the beginning of a user management system. 
// Your users are all saved in a "users.json" file, and you can currently do the following:
// - search for users
// - add new users to your users file.
// - get your starter file here: users.jsonIn een nieuw venster weergeven

// Part 0
// Create one route:
// - route 1: renders a page that displays all your users.

//Loading all modules
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');

//Setting up the server
app.set("views", "./folderofviews");//"slash mag weggelaten worden"
app.set("view engine", "pug");
app.use('/', bodyParser()); //hebben we nodig om verwijziging in de pagina weer te kunnen selecteren en geeft request.body
app.use(bodyParser.json());

//Route for homepage, displays all users
app.get('/', function(req, res){
	fs.readFile('./users.json', function (err, data){
		if (err) {
			throw err; 
		}
		var parsedUsers = JSON.parse(data);

	  	res.render("index", {users: parsedUsers})
	});
});	

// Create two more routes:
// - route 2: renders a page that displays a form which is your 
// search bar.
app.get('/searchbar', function(req, res){
	  	res.render("searchbar");
});

// - route 3: takes in the post request from your form, then displays matching users on a new page. 
// Users should be matched based on whether either their first or last name contains the input string.
// Step 1:  create post route in app2.js & take in the post request from your form.
app.post('/matchingusers', function(req, res){ 
		fs.readFile('./users.json', function (err, data){
		if (err) {
			throw err; //of console.log(error);
		}
	  	var parsedUsers = JSON.parse(data);
	  	var matchedUser;
	  	for(var i = 0; i < parsedUsers.length; i++){
		//er zijn NUUUUUU 4 values (objects) in the array
			if (req.body.veryImportantData === parsedUsers[i].firstname || req.body.veryImportantData === parsedUsers[i].lastname){
				matchedUser = parsedUsers[i];// ik gebruikte net console.log, maar dit deed nix met de code. vandaar var matchedUser...
		  	}
// req = hele pugfile	
// veryimportantdata = invoerdata in searchbar(zie pugfile) 
		};
		res.render('matchingusers',{searcheduser:matchedUser})
		});

	});

// Step 2:  displays matching users on a new page.
	
// 2a create new pug file

// 2b if statement to match input in form with json file users

// 2c if there is a match, display user in new pug file

// Part 2
// Create two more routes:

// - route 4: renders a page with three forms on it (first name, last name, and email) that allows 
// you to add new users to the users.json file.
app.get('/adduser', function(req, res){
	  	res.render("adduser");
});

// - route 5: takes in the post request from the 'create user' form, then adds the user to the 
// users.json file. Once that is complete, redirects to the route that displays all your users 
// (from part 0).

app.post('/adduser', function(req,res){
	// input fields of form (from req.body) into new object

// read/parse/write to json file with fs
fs.readFile('./users.json', function (err, data){
		 		if (err) {
	 			throw err; //of console.log(error);
	 		}
var parsedUsers = JSON.parse(data);
console.log("this is parsedusers: " + parsedUsers);

var newUser = {
	firstname: req.body.firstname, 
	lastname: req.body.lastname, 
	email: req.body.email
};

parsedUsers.push(newUser); //parsedUsers is an Array van Objects... 

var stringified = JSON.stringify(parsedUsers); 

fs.writeFile('users.json', stringified , (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

		// stringified vervangt de oude json file
	});

res.redirect('/');
});

//////////////////////////////

// var express = require('express');
// var app = express();

// app.listen(3000,function(req,res){
// 	console.log('app is running on port 3000....');
// });

// //In order 2 run Pug alongside with Express we need these 2 lines
// app.set('views', './views');
// app.set('view engine', 'pug');

// app.get('/', function (req, res) {
//   res.render('index', { title: 'Hey', message: 'Hello there!' })
// })


//De server blijft luisteren naar port 3000...
app.listen(3000, function(){
	console.log('Working out of port 3000!')
});

//////////////////////////

