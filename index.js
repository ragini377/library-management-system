const express = require('express');
const app = express();
const PORT = 8080;
app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).json({ message: 'home Page!!' });
});

// Sample route for adding a book
//app.post('/books', (req, res) => {
  //  const book = req.body;
    // Logic to add book to the database would go here
    //res.status(201).send(`Book titled "${book.title}" added successfully.`);
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    }); 