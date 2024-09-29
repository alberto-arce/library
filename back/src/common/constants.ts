import 'dotenv/config'

export const PORT=process.env.PORT
export const MONGODB_URI=process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/library?authSource=admin'
export const SECRET_KEY=process.env.SECRET_KEY || 'SECRET_KEY'
