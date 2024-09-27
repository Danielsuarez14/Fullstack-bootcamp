import { Router } from "express";
const router = Router()
import { getPoint, updatePoint } from "../controller/pointController.js";

router.get('/',getPoint)
router.put('/update',updatePoint)
export default router