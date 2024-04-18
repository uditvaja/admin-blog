const multer = require('multer');


let storage = multer.diskStorage({
    destination:(req, file, next) => {
        next(null, './upload'); 
    },
    filename:(req, file, next) => {
        const ui = Date.now() + '-' + file.originalname;

        console.log('Unique id...', ui); 
       
        next(null, ui); 
    }
});

const upload = multer({ storage });

module.exports = upload;
