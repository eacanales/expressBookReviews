const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// let users = [];

// Check if a user with the given username already exists
const doesExist = (username) => {
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

public_users.post("/register", (req,res) => {
  //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});


  // return res.status(300).json({message: "Yet to be implemented"});
//});

// TASK 1 Get the book list available in the shop

//public_users.get('/',function (req, res) {
  //Write your code here
  //res.send(JSON.stringify({books}, null, 4));
  //return res.status(300).json({message: "Yet to be implemented"});
//});

// TASK 10 Using Async-await
public_users.get('/', async function (req, res) {
  try {
    const getBooks = await new Promise((resolve, reject) => {
      if (books) {
        resolve(books);
      } else {
        reject("No books available");
      }
    });

    res.send(JSON.stringify({getBooks}, null, 4));
  } catch (error) {
    
    res.status(500).send(error);
  }
});

// TASK 2: Get book details based on ISBN.
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  
  for (let key in books) {
    console.log(key + ": " + JSON.stringify(books[key]));
  }

  const isbn = req.params.isbn;
  let filtered_books = [];

  for (let key in books) {
    if (books[key].isbn === isbn) {
        filtered_books.push(books[key]);
    }
}

res.send(filtered_books);

  //return res.status(300).json({message: "Yet to be implemented"});
 });
 
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  // Write your code here
  for (let key in books) {
    console.log(key + ": " + JSON.stringify(books[key]));
  }

  const author = req.params.author;
  let filtered_books = [];

  for (let key in books) {
    if (books[key].author === author) {
        filtered_books.push(books[key]);
    }
}

res.send(filtered_books);
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here

  for (let key in books) {
    console.log(key + ": " + JSON.stringify(books[key]));
  }

  const title = req.params.title;
  let filtered_books = [];

  for (let key in books) {
    if (books[key].title === title) {
        filtered_books.push(books[key]);
    }
}
res.send(filtered_books);

  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
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

  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
