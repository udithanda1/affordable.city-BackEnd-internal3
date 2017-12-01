const AuthService = require('../services/authService');
const responseHelper = require('../helpers/responseHelper');

const AuthController = {};

AuthController.signUp = async(req, res, next) => {
    try {
        const result = await AuthService.signup(req, res);
        responseHelper.setSuccessResponse(result, res);
    } catch (error) {
        // console.log('Error: ', error);
        next(error);
    }
};

AuthController.authenticateUser = async(req, res, next) => {
    try {
        if (!req.body.UserName || !req.body.Password) {
            responseHelper.setBadRequestResponse('Please provide a username and a password.', res);
        } else {
            const result = await AuthService.authenticateuser(req, res);
            responseHelper.setSuccessResponse(result, res);
        }
    } catch (error) {
        // console.log('Error: ', error);
        next(error);
    }
};

AuthController.refresh_token = async(req, res, next) => {
    try {
        const result = await AuthService.rf_token(req, res);
        responseHelper.setSuccessResponse(result, res);
    } catch (error) {
        // console.log('Error: ', error);
        next(error);
    }
};

AuthController.verifyAcount = async(req, res, next) => {
    try {
        const result = await AuthService.verifyacount(req, res);
        responseHelper.setSuccessResponse(result, res);
    } catch (error) {
        // console.log('Error: ', error);
        next(error);
    }
};

module.exports = AuthController;