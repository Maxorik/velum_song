/**
 * Форма для просмотра информации о песне
 */

import React, {useState} from 'react';
import Lang from '../main/settings/lang-ru';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Loader from '../main/Loader/Loader';
import ChordScheme from "../main/DrawChord/ChordScheme";

function ShowSong() {

    // TODO обработка несуществующего аккорда

    return(
        <div>{ChordScheme({
            chordName: 'C'
        })}</div>
    )
}

export default ShowSong;