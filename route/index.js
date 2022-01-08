var express = require('express');
var router = express.Router();
var indexManage = require('../controller/index');
var playerManager = require('../controller/playerManage');
var coachManager = require('../controller/coachManage');
var videoManager = require('../controller/videoManager');
var analyticsManager =  require('../controller/analyticsManager');
var teamManager =  require('../controller/teamManager');

//View page 
router.get('/', indexManage.index);
router.get('/index', indexManage.index);
//***************************************************************************** */
//-------------------------------------View Display Router-----------------------/
//***************************************************************************** */
router.get('/players', indexManage.players);
router.get('/playerDB', indexManage.playerDB);
router.get('/coaches', indexManage.coaches);
router.get('/coachDB', indexManage.coachDB);
router.get('/videos', indexManage.videos);
router.get('/analytics', indexManage.analytics);
router.get('/teams', indexManage.teams);
//-----Authentication routers -------------
router.get('/login', indexManage.login);
router.get('/signup', indexManage.register);
router.get('/errorPassword', indexManage.errorPassword);
router.get('/errorEmail', indexManage.errorEmail);
router.get('/forgot', indexManage.forgot);
router.get('/reset/:token', indexManage.reset);
router.get('/resetpassword', indexManage.resetpassword);
router.get(`/logout`, indexManage.logout);
//----------------------------------------------
//***************************************************************************** */
            //-----------------------Players-----------------------/
//***************************************************************************** */
router.get('/api/player/database', playerManager.getDatabase);
router.get('/api/player/users', playerManager.getPlayers);
router.get('/api/player/user',  playerManager.getPlayer);
router.post('/api/player/edit', playerManager.editPlayer);
router.post('/api/player/delete', playerManager.deletePlayer);
//***************************************************************************** */
            //-----------------------Coaches-----------------------/
//***************************************************************************** */
router.get('/api/coach/database', coachManager.getDatabase);
router.get('/api/coach/users', coachManager.getCoaches);
router.post('/api/coach/user', coachManager.getCoach);
router.post('/api/coach/edit', coachManager.editCoach);
router.post('/api/coach/delete', coachManager.deleteCoach);
//***************************************************************************** */
            //-----------------------Videos-----------------------/
//***************************************************************************** */
router.get('/api/video/videos', videoManager.getVideos);
router.post('/api/video/edit', videoManager.editVideo);
router.post('/api/video/delete', videoManager.deleteVideo);
//***************************************************************************** */
            //-----------------------Analytics -----------------------/
//***************************************************************************** */
router.get('/api/analytics/info', analyticsManager.getInfos);
//***************************************************************************** */
            //-----------------------Team Management-----------------------/
//***************************************************************************** */
module.exports = router;