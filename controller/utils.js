var request = require('axios');
var admin = require('firebase-admin');
var serviceAccount = require("../scoutmapp.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://athletica-732a5.firebaseio.com"
});
var db = admin.database();

//********************************************************************************************************* */
//  player functions  //
//********************************************************************************************************* */
exports.getPlayerDatasFromFireBase = async function (req, res) {
    var arrPlayers = await getPlayersFromDB()
    return { "data": arrPlayers };
}

exports.getPlayerInfosFromFireBase = async function (req, res) {
    var arrPlayers = await getPlayersFromDB();
    var arrUsers = [];
    var listUserResult = await getUserListWithPage();
    arrUsers = listUserResult.users;
    while (true) {
        if (listUserResult.pageToken) {
            listUserResult = await getUserListWithPage(listUserResult.pageToken);
            var newArray = arrUsers.concat(listUserResult.users)
            arrUsers = newArray;
        } else {
            break;
        }
    }
    for (var i = 0; i < arrPlayers.length; i++) {
        for (var j = 0; j < arrUsers.length; j++) {
            if (arrUsers[j]["uid"] === arrPlayers[i]["userId"]) {
                arrPlayers[i]["createdDate"] = arrUsers[j]["metadata"]["creationTime"];
                arrPlayers[i]["lastSignedIn"] = arrUsers[j]["metadata"]["lastSignInTime"];
            }
        }
    }
    return { "data": arrPlayers };
}

async function getUserListWithPage(nextPageToken) {
    return new Promise(function (resolve, reject) {
        admin.auth().listUsers(1000, nextPageToken)
            .then(function (listUsersResult) {
                listUsersResult.users.forEach(function (userRecord) {
                    console.log('user', userRecord.toJSON());
                });
                resolve(listUsersResult)
            })
            .catch(function (error) {
                console.log('Error listing users:', error);
                reject(null)
            });
    });
}

async function getPlayersFromDB() {
    var ref_users = db.ref("users");
    return new Promise(function (resolve, reject) {
        ref_users.on("value", function (snapshot) {
            var arrPlayers = [];
            snapshot.forEach(function (dateItem) {
                var user_key = dateItem.key;
                var user_info = dateItem.val();
                if (user_info["userType"] === "athlete") {
                    arrPlayers.push(user_info);
                }
            });
            resolve(arrPlayers);
        }, function (errorObject) {
            reject(null);
        });
    });
}

//********************************************************************************************************* */
//  coach functions  //
//********************************************************************************************************* */
exports.getCoachDatasFromFireBase = async function (req, res) {
    var arrCoaches = await getCoachesFromDB()
    return { "data": arrCoaches };
}


exports.getCoachInfosFromFireBase = async function (req, res) {
    var arrCoaches = await getCoachesFromDB();
    var arrUsers = [];
    var listUserResult = await getUserListWithPage();
    arrUsers = listUserResult.users;
    while (true) {
        if (listUserResult.pageToken) {
            listUserResult = await getUserListWithPage(listUserResult.pageToken);
            var newArray = arrUsers.concat(listUserResult.users)
            arrUsers = newArray;
        } else {
            break;
        }
    }
    for (var i = 0; i < arrCoaches.length; i++) {
        for (var j = 0; j < arrUsers.length; j++) {
            if (arrUsers[j]["uid"] === arrCoaches[i]["userId"]) {
                arrCoaches[i]["createdDate"] = arrUsers[j]["metadata"]["creationTime"];
                arrCoaches[i]["lastSignedIn"] = arrUsers[j]["metadata"]["lastSignInTime"];
            }
        }
    }
    return { "data": arrCoaches };
}

async function getCoachesFromDB() {
    var ref_users = db.ref("users");
    return new Promise(function (resolve, reject) {
        ref_users.on("value", function (snapshot) {
            var arrCoaches = [];
            snapshot.forEach(function (dateItem) {
                var user_key = dateItem.key;
                var user_info = dateItem.val();
                if (user_info["userType"] === "coach") {
                    arrCoaches.push(user_info);
                }
            });
            resolve(arrCoaches);
        }, function (errorObject) {
            reject(null);
        });
    });
}

exports.deleteUserFromFireBase = async function (req, res) {
    var user_id = req.body.user_id;
    var authDelete = await deleteUserFromAuth(user_id)
    if (authDelete) {
        var deleteResult = await deleteUserFromFirebase(user_id)
        return { "data": deleteResult };
    }else{
        return { "data": false };
    }
}

async function deleteUserFromAuth(user_id) {
    return new Promise(function (resolve, reject) {
        admin.auth().deleteUser(user_id)
        .then(function () {
            console.log('Successfully deleted user');
            resolve(true);
        })
        .catch(function (error) {
            console.log('Error deleting user:', error);
            reject(false);
        });
    });
}

async function deleteUserFromFirebase(user_id) {
    var ref_user = db.ref("users/" + user_id);
    return new Promise(function (resolve, reject) {
        ref_user.remove()
            .then(function () {
                console.log("Remove succeeded.")
                resolve({ "success": true })
            })
            .catch(function (error) {
                console.log("Remove failed: " + error.message)
                reject({ "success": false })
            });
    });
}

//********************************************************************************************************* */
//  videos functions  //
//********************************************************************************************************* */
exports.getVideosFromFireBase = async function (req, res) {
    var arrVideos = await getVideosFromDB()
    arrVideos.sort(function (a, b) {
        var dateA = new Date(a.endedAt), dateB = new Date(b.endedAt)
        return dateB - dateA //sort by date ascending
    })

    return { "data": arrVideos };
}

exports.deleteVideoFromFireBase = async function (req, res) {
    var video_id = req.body.video_id;
    var deleteResult = await deleteVideoFromFireBase(video_id)
    return { "data": deleteResult };
}

async function deleteVideoFromFireBase(video_id) {
    var ref_video = db.ref("videos/" + video_id);
    return new Promise(function (resolve, reject) {
        ref_video.remove()
            .then(function () {
                console.log("Remove succeeded.")
                resolve({ "success": true })
            })
            .catch(function (error) {
                console.log("Remove failed: " + error.message)
                reject({ "success": false })
            });
    });
}

async function getVideosFromDB() {
    var ref_videos = db.ref("videos");
    return new Promise(function (resolve, reject) {
        ref_videos.on("value", function (snapshot) {
            var arrVideos = [];
            snapshot.forEach(function (dateItem) {
                var video_key = dateItem.key;
                var video_info = dateItem.val();
                arrVideos.push(video_info);

            });
            resolve(arrVideos);
        }, function (errorObject) {
            reject(null);
        });
    });
}

//********************************************************************************************************* */
//  analytics functions  //
//********************************************************************************************************* */
exports.getInfoFromFireBase = async function (req, res) {
    var arrVideos = await getVideosFromDB()
    var arrUsers = [];
    var listUserResult = await getUserListWithPage();
    arrUsers = listUserResult.users;
    while (true) {
        if (listUserResult.pageToken) {
            listUserResult = await getUserListWithPage(listUserResult.pageToken);
            var newArray = arrUsers.concat(listUserResult.users)
            arrUsers = newArray;
        } else {
            break;
        }
    }
    var arrArticles = await getArticlesFromDB();
    return { "data": { "totalUsers": arrUsers.length, "totalVideos": arrVideos.length, "totalArticles": arrArticles.length } }
}

async function getArticlesFromDB() {
    var ref_articles = db.ref("articles");
    return new Promise(function (resolve, reject) {
        ref_articles.on("value", function (snapshot) {
            var arrArticles = [];
            snapshot.forEach(function (dateItem) {
                var article_key = dateItem.key;
                var article_info = dateItem.val();
                arrArticles.push(article_info);

            });
            resolve(arrArticles);
        }, function (errorObject) {
            reject(null);
        });
    });
}