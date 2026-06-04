/* 
 * __K と __N で囲まれた部分をランダムな文字列に置き換える ※1
 * __K と __R で囲まれた部分をランダムな文字列から元の文字列に復号する
 * ※1 __N の後ろに文字を入れる場合は __Nの後ろに__Rを入れること
*/

const LOG_DELAY = 750; // ミリ秒

const logs = [
    "[__K System __R] __Ksystem online__R",
    "[__K Profile __R] __KName : Pitohui-loco__R",
    "[__K Birthday __R] __K8/14__R",
    "[__K Contact__R] __KX : @IKATAKO_oisii__R",
    "[__K Things I like __R] __KProgramming, Games, Anime__R",

    "[__K System __R] __Kconnection closed__R"
];
