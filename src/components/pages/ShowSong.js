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


    return(
        <div>
            <div className='chordPanel'>
                <ChordScheme
                    chordName = 'Am'
                />
                <ChordScheme
                    chordName = 'C'
                />
                <ChordScheme
                    chordName = 'G5'
                />
                <ChordScheme
                    chordName = 'G115'
                />
            </div>
        </div>
    )
}

export default ShowSong;