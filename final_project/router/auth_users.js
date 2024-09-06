const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
// Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
// Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }

  //return res.status(300).json({message: "Yet to be implemented. Working on this now!! "});
});

// Add a book review - POST
regd_users.put("/auth/review/:isbn", (req, res) => {
  


});


// Add a book review - PUT

regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  //Extract reviews parameter from request URL
  const reviews = req.params.reviews;
  let user = users[reviews]; // Retrieve user object associated with reviews

  return res.status(300).json({message: "Yet to be implemented this review"});
});



// Get a book review from user authenticated
regd_users.get('/review/:isbn',function (req, res) {
    //Write your code here
    for (let key in books) {
      console.log(key + ": " + JSON.stringify(books[key]));
    }
  
    const isbn = req.params.isbn;
    let filtered_books = [];
  
    for (let key in books) {
      if (books[key].isbn === isbn) {
          filtered_books.push(books[key].reviews);
      }
    }
  res.send(filtered_books);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
