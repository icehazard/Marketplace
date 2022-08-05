const path = require('path');
const { unlink } = require('fs/promises');
const multer = require('multer');
const {v4: uuid} = require("uuid");
let dbhandler = require("../db/dbhandler")
let productHandler = require("./products")
let shopHandler = require('../classes/shops')

const package = {};
package.storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../images/'));
    },

    // By default, multer removes file extensions so let's add them back
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});

package.imageFilter = (req, file, cb) => {
    // Accept images only
    // const fileSize = parseInt(req.headers["content-length"])
    // if (fileSize > 2048000)
    //     return cb(new Error('Max image size is 2MB! Try again with smaller photo.'), false);

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
    if (req.params.image) {

        //const avatar = await UsersAvatars.findOne({ where: { avatar: req.params.avatar }});

        if (true) { //avatar
            const file = req.params.image

            if (true) { //await fileExists( path.join(__dirname, '../avatars', file) )
                const options = {
                    root: path.join(__dirname, '../images/'),
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
        fileFilter: package.imageFilter,
        limits: { fileSize: 1048576 }
    }).single('avatar');

    upload(req, res, async (err) => {
        if (!req.file) {
            return res.json({ status: "error", error: 'Please select an image to upload' });
        }
        else if (err instanceof multer.MulterError || err) {
            console.log('error2', err)
            return res.json({ status: "error", error: err });
        }
        const filename = path.parse(req.file.filename).name;
        const extension = path.parse(req.file.filename).ext;

        res.json({ avatar: filename + extension });
    });
};

package.uploadShopImg = async (req, res, sid, type) => {

    console.log(req.file)
    const upload = multer({
        storage: package.storage,
        fileFilter: package.imageFilter,
        limits: { fileSize: 1048576 }
    }).single('avatar');

    upload(req, res, async (err) => {
        if (!req.file) {
            return res.json({ status: "error", error: 'Please select an image to upload' });
        }
        else if (err instanceof multer.MulterError || err) {
            console.log('error2', err)
            return res.json({ status: "error", error: err });
        }
        const filename = path.parse(req.file.filename).name;
        const extension = path.parse(req.file.filename).ext;

        let shop = shopHandler.Shops.get(sid);
        shop.editAlbum(type, filename + extension);
        res.json({ avatar: filename + extension });
    });
};

package.uploadProdImg = async (req, res, pid, index) => {

    console.log(req.file)
    const upload = multer({
        storage: package.storage,
        fileFilter: package.imageFilter,
        limits: { fileSize: 1048576 }
    }).single('avatar');

    upload(req, res, async (err) => {
        if (!req.file) {
            return res.json({ status: "error", error: 'Please select an image to upload' });
        }
        else if (err instanceof multer.MulterError || err) {
            console.log('error2', err)
            return res.json({ status: "error", error: err });
        }
        const filename = path.parse(req.file.filename).name;
        const extension = path.parse(req.file.filename).ext;

        if (!productHandler.Products.has(pid))
            return res.status(400).json({status: "error", error: "This product doesn't exist!"})

        let p = productHandler.Products.get(pid)

        p.editAlbum(index, filename + extension);
        res.json({ photo: filename + extension });
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
