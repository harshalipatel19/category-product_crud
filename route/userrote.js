
const userctrl = require('../controller/usercontroller.js')
const router = require('express').Router()
const multer = require('multer');

// const upload = multer({
// storage : multer.memoryStorage()
// }).single("Image");

const storage =   multer.diskStorage({
   destination:'./uploads',
   filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
})
const upload = multer({
  storage:storage
});
 
router.post('/insert',upload.single("Image"),userctrl.add_category)
router.post('/add_product',upload.single("Image"),userctrl.add_product)

router.get('/get_category',userctrl.get_category_data)
router.get('/get_category/:id',userctrl.get_category)
router.get('/get_product',userctrl.get_product_data)
router.get('/get_product/:id',userctrl.get_product)

router.put('/update_category/:id',upload.single("Image"),userctrl.update_category)
router.put('/update_product/:id',userctrl.update_product)

router.delete('/delete_category/:id',userctrl.delete_category)
router.delete('/delete_product/:id',userctrl.delete_product)

module.exports = router