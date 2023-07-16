const express = require('express')
const { createQueryFeilds, findAllWithAttributeIncExc, findAllWithOp, findAllWithorders, findAllWithFinders, findAndCreateWithGetterSetter } = require('../controller/sequelizeMethods')
const router = express.Router()

router.route('/createQueryFeilds').get(createQueryFeilds)

router.route('/findAllWithAttributeIncExc').get(findAllWithAttributeIncExc)

router.route('/findAllWithOp').get(findAllWithOp)

router.route('/findAllWithorders').get(findAllWithorders)

router.route('/findAllWithFinders').get(findAllWithFinders)

router.route('/findAndCreateWithGetterSetter').get(findAndCreateWithGetterSetter)




module.exports = router