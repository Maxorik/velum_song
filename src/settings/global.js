// возвращает значение куки с именем name или undefined
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

let appSettings = {
    apiSonglist: 'https://velum-song-list-default-rtdb.firebaseio.com/songs',
    myEmail:     'gms441@mail.ru',
    lang:        'ru',
    product:     'Velum Song',
    isAdmin:     !!getCookie('isAdmin'),
    isMobile:    window.navigator.userAgent.toLowerCase().includes("mobi")
}

export default appSettings;


// TODO переделать под стор mobx