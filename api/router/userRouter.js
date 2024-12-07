import express from 'express'
import { deleteUser, userUpdate } from '../controller/userController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router()

router.post('/updateUser/:id',verifyToken,userUpdate)
router.delete('/deleteUser/:id',verifyToken,deleteUser)

export default router;