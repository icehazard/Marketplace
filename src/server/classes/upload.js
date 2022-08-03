'use strict';

const path = require('path');
const { unlink } = require('fs/promises');
const multer = require('multer');
const { v4: uuid } = require("uuid");

const Avatars = () => {
    const module = {};

    module.storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../avatars/'));
        },

        // By default, multer removes file extensions so let's add them back
        filename: (req, file, cb) => {
            cb(null, uuid() + path.extname(file.originalname));
        }
    });

    module.imageFilter = (req, file, cb) => {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };

    module.hasAvatar = async (userId) => {
        if ( userId ) {
            //const avatar = await UsersAvatars.findAndCountAll({where: {user: userId}});
            return avatar.count > 0;
        }

        return false;
    };

    module.url = async (userId) => {
        if ( userId ) {
            //const avatar = await UsersAvatars.findOne({ where: { user: userId }});
            return avatar ? '/api/avatar/' + avatar.avatar : '';
        }
        return '';
    }

    module.getImage = async (req, res, next) => {
        if ( req.params.avatar ) {
            //const avatar = await UsersAvatars.findOne({ where: { avatar: req.params.avatar }});

            if ( avatar ) {
                const file = avatar.avatar + avatar.extension;
 
                if ( true ) { //await fileExists( path.join(__dirname, '../avatars', file) )
                    const options = {
                        root: path.join(__dirname, '../avatars'),
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

    module.upload = async (req, res, next) => {
        const userId = req.session.userId;

        const upload = multer({
            storage: module.storage,
            fileFilter: module.imageFilter
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
            if (req.fileValidationError) {
                return res.json({ status: "error", error: req.fileValidationError });
            } else if (!req.file) {
                return res.json({ status: "error", error: 'Please select an image to upload' });
            } else if (err instanceof multer.MulterError || err ) {
                return res.json({ status: "error", error: err });
            }

            // TODO: add to database
            const filename = path.parse(req.file.filename).name;
            const extension = path.parse(req.file.filename).ext;

            if ( await module.hasAvatar(userId) ) {
                await module.delete(userId);
            }

            // await UsersAvatars.create({
            //     user: userId,
            //     avatar: filename,
            //     extension: extension,
            //     mimeType: req.file.mimetype
            // });

            // Display uploaded image for user validation
            res.json({ avatar: filename });
        });
    };

    module.delete = async (userId) => {
        if ( userId ) {
           // const filesToDelete = await UsersAvatars.findAll({where: {user: userId}});
           // await UsersAvatars.destroy({where: {user: userId}});
            filesToDelete.forEach((avatar) => {
                try {
                    unlink(path.join(__dirname, '../avatars', avatar.avatar + avatar.extension ) );
                } catch (e) {
                    console.error(e);
                }
            });
            return true;
        }
        return false;
    };

    return module;
}

module.exports = Avatars;
