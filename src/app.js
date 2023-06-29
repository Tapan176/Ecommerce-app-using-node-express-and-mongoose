const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/auth')
const itemRoutes = require('./routes/items')
const cartRoutes = require('./routes/cart')
const profileRoutes = require('./routes/profile')
const { errorHandler } = require('./middleware/errorHandler')
const customMorgan = require('./middleware/morgan')

const { swaggerServe, swaggerSetup } = require('./config/swaggerConfig')

dotenv.config()

const app = express()
const port = process.env.SERVER_PORT
const databaseUrl = process.env.DATABASE_URL

mongoose.connect(
  databaseUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
  console.log('Database connected successfully')
}).catch((error) => {
  console.log(error)
}
)

app.use(cookieParser())
app.use(session({
  secret: 'ecommerce',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 1000,
    httpOnly: true
  }
}))

app.use(customMorgan)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static('./public/uploads'))
app.use(authRoutes)
app.use(itemRoutes)
app.use(cartRoutes)
app.use(profileRoutes)
app.use(errorHandler)
app.use('/api-docs', swaggerServe, swaggerSetup)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

module.exports = app
