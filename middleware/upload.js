var multer = require('multer');
module.exports.files={
    storage:function(){
        var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/files/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
      })
      
      return storage;
}
}