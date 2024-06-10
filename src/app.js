import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from './routers/auth.routes.js'
import taskRouter from './routers/task.routes.js'
const app=express();
app.use(morgan('dev'))

app.use(express.json())
app.use(cookieParser())

app.use('/api',authRouter)
app.use('/api',taskRouter)
export default app;