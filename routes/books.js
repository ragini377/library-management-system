const express = require('express');
const { books } = require('../data/books.json');
const { users } = require('../data/users.json');
const router = express.Router();

/** 
 * Route: /books
 * Method: GET
 * Description: Get all books list    
 * Access: Public
 * Parameters: none
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: books
  });
});
/** 
 * Route: /books/:id
 * Method: GET
 * Description: Get book by id    
 * Access: Public
 * Parameters: id   
    */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({   
        success: false, 
        message: `Book with id ${id} not found`     
            });

  }
  res.status(200).json({    
    success: true,    
    data: book   
  });

});

/**
 * Routre: /books
 * Method: POST
 * Description: Add a new book
 * Access: Public
 * Parameters: none
 */
router.post('/', (req, res) => {
  const { id, title, author, year, genre } = req.body;
  if (!id || !title || !author || !year || !genre) {    
    return  res.status(400).json({
        success: false,
        message: 'All fields are required: id, title, author, year, genre'
    });
  }     
    const booksex = books.find(each => each.id === id);
  
    if (booksex) {
      return res.status(404).json({
        success: false,
        message: `Book already exists with id ${id}`
      });
    }
  books.push({ id, title, author, year, genre });
  res.status(201).json({
    success: true,  
    message: 'Book added successfully',
    data: { id, title, author, year, genre }
  });
}); 

/**
 * Route: /books/:id
 * Method:put
 * Description: Update book by id
 * Access: Public
 * Parameters: id
 */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {data } = req.body;
  if(!data|| Object.keys(data).length === 0){
    return res.status(400).json({
        success: false,
        message: 'No data provided to update the book'
    });
  }
  const bookIndex = books.find((each) => each.id === id);
  if (!bookIndex) {
    return res.status(404).json({

      success: false,
      message: `Book with id ${id} not found`
    });
  }
  const updatedBook = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });
  res.status(200).json({
    success: true,
    message: 'Book updated successfully',
    data: updatedBook
  });
}); 
/**
 * Route: /books/:id
 * Method: DELETE 
 * 
 * Description: Delete book by id
 * Access: Public
 * Parameters: id
 
  */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const bookIndex = books.find((each) => each.id === id);
  if (!bookIndex) {
    return res.status(404).json({
      success: false,
      message: `Book with id ${id} not found`
    });
  }
  const updatedBooks = books.filter((each) => each.id !== id);
  res.status(200).json({
    success: true,
    message: 'Book deleted successfully',
    data: updatedBooks
  });
});
/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued books
 * access: Public
 * Parameters: userId
  */
router.get('/issued/for-users', (req, res) => {
  const  userswithIssuedBooks = users.filter((each) => {
    if(each.issuebook){
      return each;
    } 
  })
  const issuedBooks = [];
  userswithIssuedBooks.forEach((each) => {
    const book = books.find((book)=>book.id=== each.issuebook);
    book.issuedBy = each.name;
    book.issueDate = each.issueDate;
    book.returnedDate = each.returnDate;
    issuedBooks.push(book)
  })
  res.status(200).json({
    success: true,
    data: issuedBooks
  });
});
 
 module.exports = router;