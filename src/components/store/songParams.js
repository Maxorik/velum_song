import {makeAutoObservable} from "mobx";
import axios from 'axios';

class SongParams {
    songsInfo = [];
    constructor() {
        makeAutoObservable(this)
    }

    getSongList() {
        axios
            .get('https://velum-song-list-default-rtdb.firebaseio.com/songs.json')
            .then(response => Object.entries(response.data))
            .then(json => {
                this.songsInfo = [...this.songsInfo, ...json]
            })
            .catch(error => console.log(error));
    }
}

export default new SongParams()