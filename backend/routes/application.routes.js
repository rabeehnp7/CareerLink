import express from "express"
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js"
import Authentication from "../middlewares/isAuthenticated.js"
const router =express.Router()

router.route('/apply/:id').post(Authentication,applyJob)
router.route("/get").get(Authentication,getAppliedJobs)
router.route("/:id/applicants").get(Authentication,getApplicants)
router.route("/status/:id/update").post(Authentication,updateStatus)

export default router