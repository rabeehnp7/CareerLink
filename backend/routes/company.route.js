import express from 'express'
import Authentication from '../middlewares/isAuthenticated.js'
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js'
import { singleUpload } from '../middlewares/multer.js'

const router=express.Router()

router.route('/register').post(Authentication,registerCompany)
router.route('/get').get(Authentication,getCompany)
router.route('/get/:id').get(Authentication,getCompanyById)
router.route('/update/:id').put(Authentication,singleUpload,updateCompany)

export default router