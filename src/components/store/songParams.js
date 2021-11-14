/**
 * Стор для изменения выбранной песни
 */

import {makeAutoObservable} from "mobx";

class SongParams {
    // модель песни
    song = {
        chordCouplet: '',
        chordChorus: '',
        songName: '',
        songComment: '',
        songText: '',
        songVideo: '',
        rhytmCouplet: '',
        rhytmChorus: '',
        songId: null
    };

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