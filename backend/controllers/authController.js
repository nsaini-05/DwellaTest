 exports.test = function(req, res, next) {
    res.status(200).json({
        success : true,
        message : 'This route'
        })
}


