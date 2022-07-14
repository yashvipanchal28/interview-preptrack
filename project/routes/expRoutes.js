const express = require('express');
const expController = require('../controllers/expController');
const router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

// router.get('/:id/:id', expController.experience_details);
router.get('/', expController.company_index);
router.post('/:id',upload.single('image'),expController.experience_create_post);
router.get('/:id', expController.company_experiences);
module.exports = router;