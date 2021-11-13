import axios from 'axios';
import jsSHA from "jssha";

function getAuthorizationHeader() {
    var AppID = '0a1efc65fdde4a22988d79eee19be308';
    var AppKey = '-8pi1DnBYwptXh_UniHRvSCjlsQ';

    var GMTString = new Date().toGMTString();
    var ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    var HMAC = ShaObj.getHMAC('B64');
    var Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
    return { 'Authorization': Authorization, 'X-Date': GMTString };
}

const Request = axios.create({
    baseURL: 'https://ptx.transportdata.tw/MOTC/',
    headers: getAuthorizationHeader()
});

export const APIRequest = (url, data) => Request.get(url, data);
