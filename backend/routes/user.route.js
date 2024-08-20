import express from 'express'
import { login, logout, register, updateprofile } from '../controllers/user.controller.js'
import Authentication from '../middlewares/isAuthenticated.js'
import { singleUpload } from '../middlewares/multer.js'

const router=express.Router()

router.route('/register').post(singleUpload,register)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/profile/updateProfile').post(Authentication,updateprofile)

export default router