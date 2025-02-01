const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const logActivity = require("../middleware/logActivity");
 
router.post('/contact',logActivity, contactController.submitContactForm);


 
router.get('/all', contactController.getAllContacts);
 
module.exports = router;