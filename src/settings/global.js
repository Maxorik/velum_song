let appSettings = {
    apiSonglist: 'https://velum-song-list-default-rtdb.firebaseio.com/songs',
    myEmail:     'gms441@mail.ru',
    lang:        'ru',
    product:     'Velum Song',
    isAdmin:     false,
    isMobile:    window.navigator.userAgent.toLowerCase().includes("mobi")
}

export default appSettings;


// TODO переделать под стор mobx