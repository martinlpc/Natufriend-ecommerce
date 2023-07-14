// * Server
import './config/config.js'
import router from './routes/index.routes.js'
import express from 'express'
import { __dirname } from "./path.js";
import * as path from 'path'
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import session from 'express-session';
import initializePassport from './config/passport.js'
import passport from 'passport'
import nodemailer from 'nodemailer'
import { Server as SocketServer } from 'socket.io'
import { readMessages, createMessage } from './services/messageServices.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { log, middlewareLogger } from './middlewares/logger.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'
import cors from 'cors'

const app = express()

/*
***********
Middlewares
***********
*/

// * CORS config
const whiteList = [
  "http://localhost:3000",
  "http://localhost:8080"
]
const corsOpts = {
  origin: function (origin, callback) {
    (whiteList.indexOf(origin) !== -1 || !origin)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS policy'))
  },
  credentials: true
}
app.use(cors(corsOpts))

// * Express, Winston Logger and Session
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middlewareLogger)
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 60 * 60
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: false
}))



// * Swagger API documentation
const swaggerOpts = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: "Natufriend - API documentation",
      description: "Description of the APIRest"
    }
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJSDoc(swaggerOpts)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))


// * Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// * Handlebars as template engine
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', path.resolve(__dirname, './views'))

// * Port setting
app.set("port", process.env.PORT)

// * Router
app.use('/', router)

// * Pathfile
app.use('/', express.static(__dirname + '/public'))

// * Nodemailer
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
    authMethod: 'LOGIN'
  },
  tls: {
    rejectUnauthorized: false  //para superar la barrera de avast
  }
});


// ERROR HANDLER (LAST MIDDLEWARE TO USE)
app.use(errorHandler)

const connectToMongoDB = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .catch(error => log('error', error.message))
  log('info', `Database connected`)
}

connectToMongoDB()

// Server launch
const server = app.listen(app.get("port"), () => {
  log('info', `Server running on port ${app.get("port")}`)
})

// Socket server for chat service
export const chatServer = new SocketServer(server, {
  cors: { corsOpts }
})
log('info', `Chat server online`)
chatServer.on("connection", async (socket) => {
  log('info', "Connection to chat detected")

  socket.on("message", async (newMessage) => {
    await createMessage([newMessage])
    const messages = await readMessages()
    log('info', 'New chat message received')
    chatServer.emit("allMessages", messages)
  })

  socket.on("load messages", async () => {
    const messages = await readMessages()
    chatServer.emit("allMessages", messages)
  })
})

