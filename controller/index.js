var utils = require('./utils');
const ENDPOINTS = utils.endPoints;
const PAGES = utils.pages;

// User Management  render
exports.index = function (req, res) {
    res.render('viewPlayer/users');
}

exports.players = function (req, res) {
    res.render('viewPlayer/users');
}
exports.playerDB = function (req, res) {
    res.render('viewPlayer/database');
}
exports.coaches = function (req, res) {
    res.render('viewCoach/users');
}
exports.coachDB = function (req, res) {
    res.render('viewCoach/database');
}

exports.videos = function (req, res) {
    res.render('viewVideos/videos');
}

exports.analytics = function (req, res) {
    res.render('viewAnalytics/analytics');
}

exports.teams = function (req, res) {
    res.render('viewTeam/teams');
}




/// Authentication render
exports.login = function (req, res) {
    res.render('viewAuth/login');
}

exports.logout = function (req, res) {        
    req.session.destroy(function (err) {
        res.redirect('/login');
    });
}
exports.register = function (req, res) {
    res.render('viewAuth/register');
}
exports.reset = function (req, res) {
    res.render('viewAuth/reset',{token: req.params.token});
}
exports.resetpassword = function(req, res) {
    res.render('viewAuth/resetpassword');
}
exports.forgot = function (req, res) {
    res.render('viewAuth/forgot');
}
exports.errorPassword = function (req, res) {
    res.render('errorpassword');
}
exports.errorEmail = function (req, res) {
    res.render('errorEmail');
}
