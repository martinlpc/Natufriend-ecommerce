import { Router } from "express";
import { deleteUser, getUsers } from "../controllers/user.controller.js";
import { Roles, checkRole, isSessionActive } from "../middlewares/session.js";

const routerUser = Router()
routerUser.use(isSessionActive, checkRole(Roles.ADMIN))

routerUser.get('/', getUsers)
routerUser.delete('/', deleteUser)

export default routerUser