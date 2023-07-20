const express = require('express')
const { createQueryFeilds, findAllWithAttributeIncExc, findAllWithOp, findAllWithorders, findAllWithFinders, findAndCreateWithGetterSetter, validation, rawQueries, oneToOne, oneToMany, manyToMany, paranoid, lazyEagerLoading, advEagerLod, creatWithAsso, M_n_Asso, m__2_m_2_m, scope, transaction } = require('../controller/sequelizeMethods')
const router = express.Router()

router.route('/createQueryFeilds').get(createQueryFeilds)

router.route('/findAllWithAttributeIncExc').get(findAllWithAttributeIncExc)

router.route('/findAllWithOp').get(findAllWithOp)

router.route('/findAllWithorders').get(findAllWithorders)

router.route('/findAllWithFinders').get(findAllWithFinders)

router.route('/findAndCreateWithGetterSetter').get(findAndCreateWithGetterSetter)

router.route('/validation').get(validation)

router.route('/rawQueries').get(rawQueries)

router.route('/oneToOne').get(oneToOne)

router.route('/oneToMany').get(oneToMany)

router.route('/manyToMany').get(manyToMany)

router.route('/paranoid').get(paranoid)

router.route('/lazyEagerLoading').get(lazyEagerLoading)

router.route('/advEagerLod').get(advEagerLod)

router.route('/creatWithAsso').get(creatWithAsso)

router.route('/M_n_Asso').get(M_n_Asso)

router.route('/m__2_m_2_m').get(m__2_m_2_m)

router.route('/scope').get(scope)

router.route('/transaction').get(transaction)










module.exports = router