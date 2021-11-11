import {makeAutoObservable} from "mobx";

class SongParams {
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

    setSongParam(props) {
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