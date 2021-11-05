import {makeAutoObservable} from "mobx";
import axios from 'axios';
import appSettings from "../../settings/global";

class SongParams {
    songsInfo = [];
    loading = true;

    constructor() {
        makeAutoObservable(this, {}, {deep:false})
    }

    getSongList() {
        axios
            .get(appSettings.apiSonglist)
            .then(response => {
                this.songsInfo = Object.entries(response.data);
                this.loading = false;
            })
            .catch(error => console.log(error));
    }
}

export default new SongParams()