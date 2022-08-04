const path = require('path');
const {unlink} = require('fs/promises');
const multer = require('multer');
const {v4: uuid} = require("uuid");
let dbhandler = require("../db/dbhandler")
let productHandler = require("./products")

const package = {};
package.storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'images/'));
    },

    // By default, multer removes file extensions so let's add them back
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});

package.imageFilter = (req, file, cb) => {
    // Accept images only
    const fileSize = parseInt(req.headers["content-length"])
    if (fileSize > 2048000)
        return cb(new Error('Max image size is 2MB! Try again with smaller photo.'), false);

    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

package.hasAvatar = async (userId) => {
    if (userId) {
        //const avatar = await UsersAvatars.findAndCountAll({where: {user: userId}});
        return avatar.count > 0;
    }

    return false;
};

package.url = async (userId) => {
    if (userId) {
        //const avatar = await UsersAvatars.findOne({ where: { user: userId }});
        return avatar ? '/api/avatar/' + avatar.avatar : '';
    }
    return '';
}

package.getImage = async (req, res, next) => {
    if (req.params.avatar) {
        //const avatar = await UsersAvatars.findOne({ where: { avatar: req.params.avatar }});

        if (avatar) {
            const file = avatar.avatar + avatar.extension;

            if (true) { //await fileExists( path.join(__dirname, '../avatars', file) )
                const options = {
                    root: path.join(__dirname, '../images'),
                    dotfiles: 'deny',
                    headers: {
                        'x-timestamp': Date.now(),
                        'x-sent': true
                    }
                };

                return res.sendFile(file, options, (err) => {
                    if (err) {
                        next(err);
                    }
                });
            }
        }
    }

    return res.sendStatus(404).end();
}

package.upload = async (req, res) => {

    console.log(req.file)
    const upload = multer({
        storage: package.storage,
        fileFilter: package.imageFilter
    }).single('avatar');

    /*
        {
            fieldname: 'songUpload',
            originalname: '04. Stairway To Heaven - Led Zeppelin.mp3',
            encoding: '7bit',
            mimetype: 'audio/mp3',
            destination: './uploads',
            filename: 'songUpload-1476677312011',
            path: 'uploads/songUpload-1476677312011',
            size: 14058414
        }
     */


    upload(req, res, async (err) => {
        console.log("🚀 ~ filename", req.file)
        if (!req.file) {
            console.log('error1')
            return res.json({status: "error", error: 'Please select an image to upload'});
        }
        // } else if (err instanceof multer.MulterError || err) {
        //     console.log('error2', err)
        //     return res.json({ status: "error", error: err });
        // }

        // TODO: add to database
        const filename = path.parse(req.file.filename).name;

        const extension = path.parse(req.file.filename).ext;

        // if ( await package.hasAvatar(userId) ) {
        //     await package.delete(userId);
        // }

        // await UsersAvatars.create({
        //     user: userId,
        //     avatar: filename,
        //     extension: extension,
        //     mimeType: req.file.mimetype
        // });

        // Display uploaded image for user validation
        res.json({avatar: filename});
    });
};

package.delete = async (userId) => {
    if (userId) {
        // const filesToDelete = await UsersAvatars.findAll({where: {user: userId}});
        // await UsersAvatars.destroy({where: {user: userId}});
        filesToDelete.forEach((avatar) => {
            try {
                unlink(path.join(__dirname, '../images', avatar.avatar + avatar.extension));
            } catch (e) {
                console.error(e);
            }
        });
        return true;
    }
    return false;
};


module.exports = package;
