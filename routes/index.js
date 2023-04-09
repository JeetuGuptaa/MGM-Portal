const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('home');
})
router.use('/admin', require('./admin'));

module.exports = router;