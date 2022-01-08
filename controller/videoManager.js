var utils = require('./utils');
var multer = require('multer')
var multerUpload = multer({ storage: multer.memoryStorage() })
const ENDPOINTS = utils.endPoints;

exports.getVideos = async function (req, res) {
    var result = await utils.getVideosFromFireBase(req, res);
    return res.json({
        data: result.data
    })
}
exports.editVideo = async function (req, res) {
    var upload = multerUpload.single("avatar-2");
    upload(req, res, async function (err) {
        console.log('Post upload image');
        console.log(req.file); 
        if (err) {
            res.json(status, "error");
        } else {
            req.body['file'] = req.file;
            var result = await utils.sendFromRequest('post', ENDPOINTS.EDITCATEGORY, req);
            if (result.success){
                res.redirect('/categories');
            }else {
                res.redirect('/error');
            }
        }
    });
}
exports.deleteVideo = async function (req, res) {
    var result = await utils.deleteVideoFromFireBase(req, res);
    return res.json({
        data: result.data
    })
}