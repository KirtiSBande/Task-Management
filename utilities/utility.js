var jwt = require('jwt-simple');
var config = require('../config/config');

function genAccessToken(playLoadData){
    var tokenData= {};
    try{
        var expireTime = calExpireTime(1);
        var token = jwt.encode({
            type : "auth token",
            user : playLoadData,
            exp : expireTime
        }, config.secret);
        tokenData.token = token;
        tokenData.expires = expireTime;
        tokenData.success = true;

    }catch(err){
        tokenData.token = token;
        tokenData.expires = expireTime;
        tokenData.success = false;
    }

    return tokenData;
}

function calExpireTime(numDays) {
    var dateObj = new Date();
    var num=dateObj.setDate(dateObj.getDate() + numDays)//dateObj.setMinutes(dateObj.getMinutes()+numDays);
    console.log("difff-----> ",num)
  // return dateObj.setDate(dateObj.getDate() + numDays);
   return num
}

module.exports.genAccessToken = genAccessToken;