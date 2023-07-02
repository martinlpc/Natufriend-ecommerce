import { Router } from "express";
import { deleteUser, getUsers, uploadDocs } from "../controllers/user.controller.js";
import { Roles, checkRole, isSessionActive } from "../middlewares/session.js";
import { uploader } from "../utils/multer.js";

const routerUser = Router()

routerUser.get('/', isSessionActive, checkRole(Roles.ADMIN), getUsers)
routerUser.delete('/', isSessionActive, checkRole(Roles.ADMIN), deleteUser)
routerUser.post('/:uid/documents', isSessionActive, uploader.single('file'), uploadDocs)

export default routerUser