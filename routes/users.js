const express = require('express');
const { users } = require('../data/users.json');

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all users list    
 * Access: Public
 * Parameters: none
 */

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: users
  });
});
/**
 * Route: /users/:id
 * Method: GET
 * Description: Get single user by id    
 * Access: Public
 * Parameters: id 
 */

router.get('/:id', (req, res) => {

  const { id } = req.params;
  const user = users.find(each => each.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User not found with id ${id}`
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

/**
 * Route: /users
 * Method: POST
 * Description: Create a new user    
 * Access: Public
 * Parameters: none
 */

router.post('/', (req, res) => {
  const { id, name, email } = req.body;
  if(!id || !name || !email){
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  const user = users.find(each => each.id === id);

  if (user) {
    return res.status(404).json({
      success: false,
      message: `User already exists with id ${id}`
    });
  }

  users.push({ id, name, email });

  res.status(200).json({
    success: true,
    message: "User created successfully",
    data: { id, name, email }
  });
});


/**
 * Route: /users/:id
 * Method: PUT
 * Description: Update user by id    
 * Access: Public
 * Parameters: id       
 */
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { data} = req.body;
    const userIndex = users.find((each) => each.id === id);
  
    if (! userIndex) {
      return res.status(404).json({
        success: false,
        message: `User not found with id ${id}`
      });
    }

    users[userIndex] = { ...users[userIndex], ...data };

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: users[userIndex]
    });
  const updatedUser = users.map(each => {
    if (each.id === id) {
      return { ...each, ...data };
    } 
    return each;  
  });
  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: updatedUser     

  });   
 });
 /**
  * Router: /users/:id
  * Method: DELETE
  * Description: Delete user by id    
  * Access: Public
  * Parameters: id       
  */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.find((each) => each.id === id);

  if (!userIndex) { 
    return res.status(404).json({
      success: false,
      message: `User not found with id ${id}`
    });
  } 
  const deletedUser = users.filter(each => each.id !== id);

  res.status(200).json({  
    success: true,
    message: "User deleted successfully",
    data: deletedUser
  });
}); 

module.exports = router;
