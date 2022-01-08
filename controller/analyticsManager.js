var utils = require('./utils');
var multer = require('multer')

exports.getInfos = async function (req, res) {
    var result = await utils.getInfoFromFireBase(req, res);
    return res.json({
        data: result.data
    })
}
