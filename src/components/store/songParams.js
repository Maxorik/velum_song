/**
 * Стор для изменения выбранной песни
 */

import {makeAutoObservable} from "mobx";

class SongParams {
    /**
     * модель песни:
        chordCouplet - аккорды куплета
        chordChorus  - аккорды припева
        songName     - название песни
        songComment  - комментарий к игре
        songText     - текст песни
        songVideo    - ссылка на видео с разбором
        rhytmCouplet - ритм куплета
        rhytmChorus  - ритм припева
        songId
     */

    constructor() {
        makeAutoObservable(this, {}, {deep:false})
    }

    setSong(props) {
        this.song = props;
    }

    changeParam(param, value) {
        this.song = {
            ...this.song,
            [param]: value
        }
    }
}

export default new SongParams()