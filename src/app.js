import express from 'express'
import morgan from 'morgan';

import authRouter from './routers/auth.route.js'
const app=express();
app.use(morgan('dev'))

app.use(authRouter)
export default app;