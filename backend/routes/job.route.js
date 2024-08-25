import express  from 'express'
import { getAdminjobs, getAllJobs, getJobById, postJob, updateJob } from '../controllers/job.controller.js'
import Authentication from '../middlewares/isAuthenticated.js'
const router = express.Router()

router.route('/postJob').post(Authentication,postJob)
router.route('/get').get(Authentication,getAllJobs)
router.route('/get/:id').get(Authentication,getJobById)
router.route('/getAdminJobs').get(Authentication,getAdminjobs)
router.route('/update/:id').post(Authentication,updateJob)

export default router