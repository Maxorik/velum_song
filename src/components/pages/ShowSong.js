/**
 * Форма для просмотра информации о песне
 */

import React from 'react';
import {observer} from 'mobx-react-lite'
import Lang from "../../settings/lang-ru";
import Button from '@material-ui/core/Button';
import ChordScheme from "../ui/ChordScheme/ChordScheme";
import VideoIntegration from "../ui/VideoIntegration/VideoIntegration";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import songParams from "../store/songParams";
import songList from "../store/songList";

const ShowSong = observer((props) => {
    const songData = props.songData[1];
    const chordsCouplet = songData.chordCouplet.split(' ');
    const chordsChorus = songData.chordChorus.split(' ');

    function setEditMode() {
        songParams.setSongParam(props.songData[1]);
        songParams.changeParam('songId', props.songData[0]);
        props.setMode();
    }

    function deleteSong() {
        songList.loading = true;
        songList.deleteSong(props.songData[0]);
    }

    return(
        <div className='form-view'>
            <div style={{display: 'flex'}}>
                <Button
                    variant="text"
                    startIcon={<EditIcon />}
                    className='positive-button small-button'
                    onClick={setEditMode}
                >
                    {Lang.editButton}
                </Button>
                <Button
                    variant="text"
                    startIcon={<DeleteForeverIcon />}
                    className='small-button'
                    onClick={deleteSong}
                >
                    {Lang.deleteButton}
                </Button>
            </div>
            <h2>{songData.songName}</h2>
            <pre>{songData.songComment}</pre>
            <VideoIntegration
                link={songData.songVideo}
                key={songData.songVideo}
            />
            <div className='mt-5 flex-row-container'>
                <div>
                    <h5>{Lang.coupletTitle}</h5>
                    <p>{songData.rhytmCouplet}</p>
                    <div className='chordPanel'>
                        {chordsCouplet.map((chord, index) => {
                            return (
                                <ChordScheme
                                    chordName = {chord}
                                    key = {chord + index}
                                />
                            )
                        })}
                    </div>
                </div>
                <div className='divider'></div>
                <div className='form-view-half'>
                    <h5>{Lang.chorusTitle}</h5>
                    <p>{songData.rhytmChorus}</p>
                    <div className='chordPanel'>
                        {chordsChorus.map((chord, index) => {
                            return (
                                <ChordScheme
                                    chordName = {chord}
                                    key = {chord + index}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
            <pre className='mt-5'>{songData.songText}</pre>
        </div>
    )
})

export default ShowSong;