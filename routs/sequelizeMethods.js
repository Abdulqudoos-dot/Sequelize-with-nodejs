const express = require('express')
const { createQueryFeilds, findAllWithAttributeIncExc } = require('../controller/sequelizeMethods')
const router = express.Router()

router.route('/createQueryFeilds').get(createQueryFeilds)
router.route('/findAllWithAttributeIncExc').get(findAllWithAttributeIncExc)


module.exports = router