const {Router} = require('express');
const UserController = require('../controllers/user-controller');
const { UserValidate, UserValidateID, UserValidadeLogin } = require('../middlewares/user-validate');
const router = Router(); 

// Create user
router.post('/', UserValidate, UserController.create);

// GetAll user
router.get('/', UserController.getAll);

// GetOne user
router.get('/:id', UserValidateID, UserController.getOne);

// Update user
router.put('/:id', UserValidateID, UserController.update);

// Delete user
router.delete('/:id', UserValidateID, UserController.delete);

// Login user
router.post('/login', UserValidadeLogin, UserController.login);


module.exports = router;