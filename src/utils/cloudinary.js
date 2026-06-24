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

        fs.unlinkSync(localFilePath)

        return response
    }
    catch(error){
        try {
            fs.unlinkSync(localFilePath)
        } catch (unlinkError) {
            // file may already be gone - safe to ignore
        }
        return null
    }
}

// upload_large uses a callback pattern under the hood, not a Promise,
// so we wrap it manually to use it cleanly with async/await.
// Only actually needed for video files over 100MB - for anything smaller,
// the regular upload() above works fine and is simpler.
const uploadVideoOnCloudinary = (localFilePath) => {
    return new Promise((resolve, reject) => {
        if (!localFilePath) {
            resolve(null)
            return
        }

        cloudinary.uploader.upload_large(
            localFilePath,
            {
                resource_type: "video",
                chunk_size: 6000000
            },
            (error, result) => {
                if (error) {
                    console.log("CLOUDINARY VIDEO UPLOAD ERROR:", error)
                    try {
                        fs.unlinkSync(localFilePath)
                    } catch (unlinkError) {
                        // file may already be gone - safe to ignore
                    }
                    resolve(null)
                    return
                }

                console.log("video uploaded successfully ", result.secure_url)

                try {
                    fs.unlinkSync(localFilePath)
                } catch (unlinkError) {
                    // file may already be gone - safe to ignore
                }

                resolve(result)
            }
        )
    })
}

export {uploadoncloudinary, uploadVideoOnCloudinary}