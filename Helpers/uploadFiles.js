import multer from 'multer';

const storage = multer.diskStorage({
    destination: './Media/',
    filename: async function(req, file, cb) {
        cb(null, file.originalname.replace(/\W+/g, '-').toLowerCase() + Date.now() + '.' + file.mimetype.split('/')[1]);
        //console.log(file.mimetype.split('/')[1])
    }
});

const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(PDF|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const videoFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(mp4|mov|wmv|flv|WebM|mkv|)$/)) {
        req.fileValidationError = 'Only video files are allowed!';
        return cb(new Error('Only video files are allowed!'), false);
    }
    cb(null, true);
};

export {
    storage,
    imageFilter,
    videoFilter
}