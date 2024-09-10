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
//public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  
  //for (let key in books) {
    //console.log(key + ": " + JSON.stringify(books[key]));
  //}

  //const isbn = req.params.isbn;
  //let filtered_books = [];

  //for (let key in books) {
    //if (books[key].isbn === isbn) {
        //filtered_books.push(books[key]);
    //}
//}

//res.send(filtered_books);

  //return res.status(300).json({message: "Yet to be implemented"});
 //});

// TASK 11 with promise
public_users.get('/isbn/:isbn', function (req, res) {
  // Encapsular la lógica de búsqueda en una promesa
  const getBookByIsbn = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    let filtered_books = [];

    // Recorrer los libros para buscar por ISBN
    for (let key in books) {
      console.log(key + ": " + JSON.stringify(books[key]));

      if (books[key].isbn === isbn) {
        filtered_books.push(books[key]);
      }
    }

    // Si se encuentra el libro, resolvemos la promesa
    if (filtered_books.length > 0) {
      resolve(filtered_books);
    } else {
      // Si no se encuentra, rechazamos la promesa
      reject("Book not found");
    }
  });

  // Manejar la promesa con .then() y .catch()
  getBookByIsbn
    .then((filtered_books) => {
      // Enviar el libro encontrado
      res.send(filtered_books);
    })
    .catch((error) => {
      // Manejar el error si no se encuentra el libro
      res.status(404).send(error);
    });
});

 
// TASK 3: Get book details based on author
//public_users.get('/author/:author',function (req, res) {
  // Write your code here
  //for (let key in books) {
    //console.log(key + ": " + JSON.stringify(books[key]));
  //}

  //const author = req.params.author;
  //let filtered_books = [];

  //for (let key in books) {
    //if (books[key].author === author) {
        //filtered_books.push(books[key]);
    //}
//}

//res.send(filtered_books);
  //return res.status(300).json({message: "Yet to be implemented"});
//});

// TASK 12: 
public_users.get('/author/:author', async function (req, res) {
  try {
    // Obtener el autor desde los parámetros de la solicitud
    const author = req.params.author;

    // Crear una promesa para simular la operación asíncrona de filtrado
    const getBooksByAuthor = new Promise((resolve, reject) => {
      let filtered_books = [];

      // Recorrer los libros y buscar por autor
      for (let key in books) {
        console.log(key + ": " + JSON.stringify(books[key]));

        if (books[key].author === author) {
          filtered_books.push(books[key]);
        }
      }

      // Resolver si se encuentra al menos un libro
      if (filtered_books.length > 0) {
        resolve(filtered_books);
      } else {
        reject("Author not found");
      }
    });

    // Esperar a que se resuelva la promesa
    const booksByAuthor = await getBooksByAuthor;

    // Enviar los libros filtrados
    res.send(booksByAuthor);
  } catch (error) {
    // Manejar cualquier error (si el autor no se encuentra)
    res.status(404).send(error);
  }
});


// TASK 4:  Get all books based on title
//public_users.get('/title/:title',function (req, res) {
  //Write your code here

  //for (let key in books) {
    //console.log(key + ": " + JSON.stringify(books[key]));
  //}

  //const title = req.params.title;
  //let filtered_books = [];

  //for (let key in books) {
    //if (books[key].title === title) {
        //filtered_books.push(books[key]);
    //}
//}
//res.send(filtered_books);

  //return res.status(300).json({message: "Yet to be implemented"});
//});

// TASK 13 - PROMISE
public_users.get('/title/:title', function (req, res) {
  // Crear una promesa que encapsule la lógica de filtrado
  const getBooksByTitle = new Promise((resolve, reject) => {
    const title = req.params.title;
    let filtered_books = [];

    // Recorrer los libros y buscar por título
    for (let key in books) {
      console.log(key + ": " + JSON.stringify(books[key]));

      if (books[key].title === title) {
        filtered_books.push(books[key]);
      }
    }

    // Resolver la promesa si se encuentran libros
    if (filtered_books.length > 0) {
      resolve(filtered_books);
    } else {
      // Rechazar la promesa si no se encuentra el libro por título
      reject("Title not found");
    }
  });

  // Manejar la promesa con .then() y .catch()
  getBooksByTitle
    .then((filtered_books) => {
      // Enviar los libros filtrados
      res.send(filtered_books);
    })
    .catch((error) => {
      // Manejar el error si no se encuentra el libro
      res.status(404).send(error);
    });
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
