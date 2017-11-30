const jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../models/database');
// const mail = require('../helpers/mailHelper');
const responseHelper = require('../helpers/responseHelper');

const AuthService = function() {};

AuthService.prototype.signup = async(req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const newUser = {
            first_name: req.body.FirstName,
            last_name: req.body.LastName,
            email_id: req.body.Email,
            phone_number: req.body.PhoneNumber,
            user_name: req.body.Email,
            password: req.body.Password
        };
        const user = await db.user.create(newUser, { transaction });
        const token = jwt.sign({
                EmailId: user.email_id,
                id: user.id,
                FirstName: user.first_name,
                LastName: user.last_name
            },
            config.keys.secret, { expiresIn: '30m' }
        );
        const ref_token = jwt.sign({ EmailId: user.email_id },
            config.keys.refSecret, { expiresIn: '30d' }
        );
        const refToken = {
            refresh_token: ref_token,
            user_name: user.email_id
        };
        const refresh_token = await db.refresh_tokens.create(refToken, { transaction });
        const data = {
            email: user.email_id,
            subject: 'Sending Email using Node.js',
            html: `<p>Click <a href="http://localhost:3000/user-verification/${user.id}">here</a> to verify your account.</p>`

        };
        // mail.sendmail(data, res);

        await transaction.commit();
        const result = {
            Refresh_Token: ref_token,
            Token: `JWT ${token}`
        };
        return result;
    } catch (error) {
        await transaction.rollback();
        throw (error);
    }
};

AuthService.prototype.authenticateuser = async(req, res) => {
    try {
        const username = req.body.UserName;
        const password = req.body.Password;
        const potentialUser = { where: { email_id: username } };
        const user = await db.user.findOne(potentialUser, res);
        if (!user) {
            responseHelper.setBadRequestResponse('Authentication failed!', res);
        } else {
            let isMatch = await user.comparePasswords(password);
            if (isMatch) {
                const token = jwt.sign({
                        EmailId: user.email_id,
                        id: user.id,
                        FirstName: user.first_name,
                        LastName: user.last_name
                    },
                    config.keys.secret, { expiresIn: '30m' }
                );
                const ref_token = jwt.sign({ EmailId: user.email_id },
                    config.keys.refSecret, { expiresIn: '30d' }
                );
                const refToken = {
                    refresh_token: ref_token
                };
                await db.refresh_tokens.update(refToken, { where: { user_name: user.email_id } });
                const result = {
                    Refresh_Token: ref_token,
                    Token: `JWT ${token}`
                };
                return result;
            }
            responseHelper.setBadRequestResponse('Login failed!', res);
        }
    } catch (error) {
        throw (error);
    }
};
AuthService.prototype.rf_token = async(req, res) => {
    try {
        const refresh_token = req.headers['refresh-token'];
        const decoded = jwt.verify(refresh_token, config.keys.refSecret);
        const potentialUser = { where: { email_id: decoded.EmailId } };
        const user = await db.user.findOne(potentialUser, res);
        const token = jwt.sign({
                EmailId: user.email_id,
                id: user.id,
                FirstName: user.first_name,
                LastName: user.last_name
            },
            config.keys.secret, { expiresIn: '30m' }
        );
        const ref_token = jwt.sign({ EmailId: user.email_id },
            config.keys.refSecret, { expiresIn: '30d' }
        );
        const refToken = {
            refresh_token: ref_token
        };
        await db.refresh_tokens.update(refToken, { where: { user_name: user.email_id } });
        const result = {
            Refresh_Token: ref_token,
            Token: `JWT ${token}`
        };
        return result;
    } catch (error) {
        throw (error);
    }
};

AuthService.prototype.verifyacount = async(req, res) => {
    try {
        const data = {
            status: 1
        };
        const potentialUser = { where: { id: req.body.UserId } };
        await db.user.update(data, potentialUser);
        const user = await db.user.findOne(potentialUser, res);
        const token = jwt.sign({
                EmailId: user.email_id,
                id: user.id,
                FirstName: user.first_name,
                LastName: user.last_name
            },
            config.keys.secret, { expiresIn: '30m' }
        );
        const ref_token = jwt.sign({ EmailId: user.email_id },
            config.keys.refSecret, { expiresIn: '30d' }
        );
        const refToken = {
            refresh_token: ref_token
        };
        await db.refresh_tokens.update(refToken, { where: { user_name: user.email_id } });
        const result = {
            Refresh_Token: ref_token,
            Token: `JWT ${token}`
        };
        return result;
    } catch (error) {
        throw (error);
    }
};

module.exports = new AuthService();