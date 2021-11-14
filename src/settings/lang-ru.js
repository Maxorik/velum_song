// TODO разбить на категории
const Lang = {
    langWithParams: function (...args) {
        let phrase = args[0];
        for(let i=1; i<args.length; i++) {
            phrase = phrase.replace(/\{\d}/, args[i]);
        }
        return phrase;
    },

    addSongTitle:   'Добавить песню',
    coupletTitle:   'Куплет',
    chorusTitle:    'Припев',

    songComment:    'Комментарий к песне',
    songName:       'Название песни',
    songText:       'Текст песни',
    songVideo:      'Видео с Youtube',

    chordCouplet:   'Аккорды куплета',
    chordChorus:    'Аккорды припева',
    rhytmCouplet:   'Ритм куплета',
    rhytmChorus:    'Ритм припева',

    songTextHelper: 'Скопируйте сюда текст целиком',
    chordHelper:    'Впишите аккорды через пробел',
    rhytmHelper:    'Набейте ритм кнопками, либо выберите пресет',
    songCommentHelper: 'Опишите особенности игры, темп ритма',
    songVideoHelper:    'Скопируйте сюда ссылку на видео с Youtube',

    presets:        'Пресеты',
    rhytm8:         'Бой 8',
    rhytm6:         'Бой 6',
    rhytm4:         'Бой 4',
    rhytmGalop:     'Галоп',

    saveButton:     'Сохранить',
    cancelButton:   'Отмена',
    previewButton:  'Предпросмотр',
    backButton:     'Назад',
    editButton:     'Редактировать',
    deleteButton:   'Удалить',
    addSongButton:  'Добавить песню',

    noSongs:           'Список песен пуст',
    deleteConfirmText: 'Действительно хотите удалить {0}?',

    passInput:         'Пароль',
    invalidPass:       'Неверный пароль',
    enterPassText:     'Введите пароль для входа:',
    enterButton:       'Войти',
};

export default Lang;