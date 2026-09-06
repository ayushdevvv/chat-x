import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, 
  },
  fileFilter:(req,file,cb)=>{

    const isImage = file.mimetype.startsWith("image/")
    const isVideo = file.mimetype.startsWith("video/")

    if(!isImage && !isVideo){

        cb(new Error("Only image and video files are allowed"),false)
    }

    cb(null,true)
  }
});

