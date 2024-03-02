import express, { Express } from 'express'
import * as database from "./config/database"
import mainRouterV1 from './api/v1/routers/index.router'
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()
database.connect();

const app: Express = express()
const port:number | string  = process.env.PORT;

app.use(cors())

// parse application/json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mainRouterV1(app);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})