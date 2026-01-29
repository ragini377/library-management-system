const express = require('express');
const {users}= require('./data/users.json');
const usersRouter= require('./routes/users.js');
const booksRouter= require('./routes/books.js');


const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'home Page!!' });
});
app.use('/users', usersRouter);
app.use('/books', booksRouter);








app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});