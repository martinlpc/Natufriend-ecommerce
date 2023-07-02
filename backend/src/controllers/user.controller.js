import { deleteUserByEmail, findUsers, updateUser, findUserById } from "../services/userServices.js";


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

export const uploadDocs = async (req, res, next) => {
  try {
    const files = req.file
    const userID = req.params.uid

    if (!files) {
      req.logger.info('No file received in the request')
      return res.status(400).send('No file received')
    }

    const isFound = await findUserById(userID)
    if (!isFound) {
      req.logger.info('User not found')
      return res.status(400).send('User not found')
    }

    const newDocsItem = {
      name: files.filename,
      reference: files.path
    }

    await updateUser(
      userID,
      { $push: { documents: { ...newDocsItem } } }
    )

    req.logger.info(`
    <UPLOAD> 
    user id: ${userID}
    file name: ${files.originalname}
    file type: ${files.mimetype}
    file size: ${files.size}
    file path: ${files.path}
    -------------------------END------------------------`)

    res.status(201).send('File uploaded succesfully')

  } catch (error) {
    res.status(500).send(error)
  }
}