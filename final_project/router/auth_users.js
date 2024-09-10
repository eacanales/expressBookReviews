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

// Add a book review 
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const newReview = req.body.reviews; // Suponiendo que el cuerpo de la solicitud contiene el campo "review"

  // Recorre todos los libros para encontrar el que tiene el ISBN correspondiente
  let bookFound = false;
  for (let key in books) {
    if (books[key].isbn === isbn) {
      bookFound = true;

      // Si no existen reseñas para este libro, inicializa el array de reseñas
      if (!books[key].reviews) {
        books[key].reviews = [];
      }

      // Añadir la nueva reseña al array de reseñas del libro
      books[key].reviews.push(newReview);

      // Enviar una respuesta indicando que la reseña fue agregada
      return res.status(200).json({ message: "Review successfully added", book: books[key] });
  }
} 
      // Si el libro no fue encontrado, envía un mensaje de error
      if (!bookFound) {
      return res.status(404).json({ message: "Book not found" });
  }
});     

// Delete a review
regd_users.delete('/auth/review/:isbn', function (req, res) {
  // Display all the books in the console.
  for (let key in books) {
    console.log(key + ": " + JSON.stringify(books[key]));
  }

  // Get ISBN
  const isbn = req.params.isbn;
  let filtered_books = [];
  let found = false;  // to know if the book has been found

  // Look for the book and delete the reviews
  for (let key in books) {
    if (books[key].isbn === isbn) {
        filtered_books.push(books[key].reviews);
        books[key].reviews = [];  
        found = true;  
    }
  }

    if (found) {
    res.send("Reviews have been deleted for the book with ISBN: " + isbn);
  } else {
    res.status(404).send("Book not found");
  }
});




// GET
regd_users.get('/auth/isbn/:isbn',function (req, res) {
    //Write your code here
    res.send(JSON.stringify({books}, null, 4));
    //return res.status(300).json({message: "Yet to be implemented"});
  });
  
  // Get book details based on ISBN.
  regd_users.get('/isbn/:isbn',function (req, res) {
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
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
