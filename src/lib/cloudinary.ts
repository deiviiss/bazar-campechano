import { v2 as cloudinary } from 'cloudinary'

// config cloudinary // TODO: Chance for folder name
cloudinary.config(process.env.CLOUDINARY_URL ?? '')

export default cloudinary
