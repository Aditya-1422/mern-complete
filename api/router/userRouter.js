import express from 'express'
import { userUpdate } from '../controller/userController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router()

router.post('/updateUser/:id',verifyToken,userUpdate)

export default router;