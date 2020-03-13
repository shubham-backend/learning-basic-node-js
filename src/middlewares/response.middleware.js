"use strict";
console.log('here');

exports.ErrorHandler = function (err, req, res, next) {
    if (err) {
        return res.status(400).send({
            success: false,
            code: 400,
            key: err.joi.details[0].context.key,
            message: err.joi.details[0].message.replace(/"/g, '')
        });
    }
    else if (err.expose) {
        return res.status(err.status).json({
            success: false,
            message: err.message,
            statusCode: err.statusCode
        });
    }
    else {
        console.log('ERROR -> ', err);
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Internal Server Error'
        });
    }
};

exports.InvalidRoute = (req, res, next) => {
    res.status(404).json({
        success: false,
        code: 404,
        message: 'Invalid route',
    });
};

exports.sendResponse = (res, msg, result) => {
    return res.status(200).json({
        success: true,
        code: 200,
        message: msg,
        result
    });
};