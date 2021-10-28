/**
 * Форма для просмотра информации о песне
 */

import React from 'react';
import Lang from "../../settings/lang-ru";
import Button from '@material-ui/core/Button';
import ChordScheme from "../ui/ChordScheme/ChordScheme";
import VideoIntegration from "../ui/VideoIntegration/VideoIntegration";

function ShowSong(props) {
    const chordsCouplet = props.songData.chordCouplet.split(' ');
    const chordsChorus = props.songData.chordChorus.split(' ');

    function backToEdit() {
        props.showTrackInfo(false);
    }

    return(
        <div className='form-view'>
            <h2>{props.songData.songName}</h2>
            <pre>{props.songData.songComment}</pre>
            <VideoIntegration
                link={props.songData.songVideo}
                key={props.songData.songVideo}
            />
            <div className='mt-5 flex-row-container'>
                <div>
                    <h5>{Lang.coupletTitle}</h5>
                    <p>{props.songData.rhytmCouplet}</p>
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
                    <p>{props.songData.rhytmChorus}</p>
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
            <pre className='mt-5'>{props.songData.songText}</pre>

            <div className='form-buttons-container'>
                <Button variant="contained" className='positive-button' onClick={backToEdit}>{Lang.backButton}</Button>
            </div>
        </div>
    )
}

export default ShowSong;