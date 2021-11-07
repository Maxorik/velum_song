import {makeAutoObservable} from "mobx";
import axios from 'axios';
import appSettings from "../../settings/global";

class SongList {
    songsInfo = [];
    loading = true;

    constructor() {
        makeAutoObservable(this, {}, {deep:false})
    }

    getSongList() {
        axios
            .get(appSettings.apiSonglist + '.json')
            .then(response => {
                this.songsInfo = Object.entries(response.data);
                this.loading = false;
            })
            .catch(error => console.log(error));
    }

    addNewSong(songParams) {
        axios.post(appSettings.apiSonglist + '.json', songParams)
            .then(response => {
                // TODO добавить лоадер
            })
            .catch(error => {
                console.log(error);
            })
    }

    changeSong(songParams) {
        axios.put(appSettings.apiSonglist + '/' + songParams.songId + '.json', songParams)
            .then(response => {
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export default new SongList()