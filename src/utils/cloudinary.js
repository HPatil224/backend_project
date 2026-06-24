import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadoncloudinary = async(localFilePath) =>{
    try{
        if(!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })

        console.log("file is upoaded succesfully ", response.url);

        // clean up the local temp file now that it's safely on Cloudinary
        fs.unlinkSync(localFilePath)

        return response
    }
    catch(error){
        // remove the locally saved temp file as the upload is unsuccesful
        try {
            fs.unlinkSync(localFilePath)
        } catch (unlinkError) {
            // file may already be gone - safe to ignore
        }
        return null
    }
}

// Use this instead of uploadoncloudinary specifically for video files.
// upload_large streams the file in chunks, which avoids timeouts/failures
// on bigger video files that the regular upload() call isn't built for.
const uploadVideoOnCloudinary = async(localFilePath) => {
    try {
        if (!localFilePath) return null

        const response = await cloudinary.uploader.upload_large(localFilePath, {
            resource_type: "video",
            chunk_size: 6000000 // 6MB per chunk
        })

        console.log("video uploaded successfully ", response.url);

        fs.unlinkSync(localFilePath)

        return response
    }
    catch (error) {
        try {
            fs.unlinkSync(localFilePath)
        } catch (unlinkError) {
            // file may already be gone - safe to ignore
        }
        return null
    }
}

export {uploadoncloudinary, uploadVideoOnCloudinary}