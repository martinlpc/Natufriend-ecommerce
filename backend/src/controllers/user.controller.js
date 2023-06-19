import { deleteUserByEmail, findUsers } from "../services/userServices.js";

export const getUsers = async (req, res) => {
    try {
        const users = await findUsers()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteUser = async (req, res) => {
    const { email } = req.body
    try {
        const response = await deleteUserByEmail(email)
        res.status(200).send({
            status: "success",
            message: "user deleted"
        })
    } catch (error) {
        res.status(500).send(error)
    }
}