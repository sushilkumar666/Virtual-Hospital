import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

cloudinary.config({
    cloud_name: "dgjqrdpbq",
    api_key: 996285163395243,
    api_secret: "wSgAS-6zOz1RZYgLRg-sYTXGAbQ",
});


const uploadOnCloudinary = async (localFilePath) => {
   
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response.secure_url;

    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log('cloudnary errro')
        console.log('cloudinary error ' + error); 
        
        // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export { uploadOnCloudinary }