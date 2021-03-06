/**
 * Форма для добавления или редактирования трека
 */

import React from 'react';
import {observer} from 'mobx-react-lite'
import Lang from "../../settings/lang-ru";
import rhytms from "../../lib/rhytms";
import RhytmItems from "../ui/RhytmItems/RhytmItems";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loader from "../ui/Loader/Loader";
import songParams from "../store/songParams";
import songList from "../store/songList";

const EditSongForm = observer((props) => {
    const title = props.isNewSong ? Lang.addSongTitle : Lang.editSongTitle;

    // TODO проверить добавление
    songParams.song = props.isNewSong ? {} : songParams.song;

    function handleSubmit(event) {
        event && event.preventDefault();
        songList.loading = true;
        songParams.song.songId ? songList.changeSong(songParams.song) : songList.addNewSong(songParams.song);
        props.isModal ? props.isModal() : props.setMode();
    }

    function onChangeInput(event) {
        const chordMaskRe = /^[\w\s#]+$/;
        const value = event.target.value;
        const name = event.target.name;

        if (name === 'chordCouplet' || name === 'chordChorus') {
            if (!value || chordMaskRe.test(value)) {
                songParams.changeParam(name, value);
            }
        } else {
            songParams.changeParam(name, value);
        }
    }

    function onChangeRhytm(event) {
        const key = event.currentTarget.name;
        const rhytmtype = event.currentTarget.getAttribute('rhytmtype');

        key === 'clear' ? songParams.changeParam(rhytmtype, '') :
                          songParams.changeParam(rhytmtype, songParams.song[rhytmtype] + rhytms[key]);
    }

    function cancelEdit() {
        props.isModal ? props.isModal() : props.setMode();
    }

    return (<div>
                <form className='form-view' onSubmit={handleSubmit}>
                    <h3 className='subtitle'>{title}</h3>
                    <TextField
                        label={Lang.songName}
                        className='mt-3'
                        name='songName'
                        onChange={onChangeInput}
                        value={songParams.song.songName}
                    />
                    <TextField
                        label={Lang.songComment}
                        helperText={Lang.songCommentHelper}
                        className='mt-3' multiline
                        name='songComment'
                        onChange={onChangeInput}
                        value={songParams.song.songComment}
                    />
                    <div className='mt-5 flex-row-container'>
                        <div>
                            <h5 className='subtitle'>{Lang.coupletTitle}</h5>
                            <TextField
                                name="chordCouplet"
                                label={Lang.chordCouplet}
                                helperText={Lang.chordHelper}
                                className='form-view-half'
                                onChange={onChangeInput}
                                value={songParams.song.chordCouplet}
                            />
                            <RhytmItems
                                type={'rhytmCouplet'}
                                value={songParams.song.rhytmCouplet}
                                onChange={onChangeRhytm}
                            />
                        </div>
                        <div className='form-view-half'>
                            <h5 className='subtitle'>{Lang.chorusTitle}</h5>
                            <TextField
                                name="chordChorus"
                                label={Lang.chordChorus}
                                helperText={Lang.chordHelper}
                                className='form-view-half'
                                onChange={onChangeInput}
                                value={songParams.song.chordChorus}
                            />
                            <RhytmItems
                                type={'rhytmChorus'}
                                value={songParams.song.rhytmChorus}
                                onChange={onChangeRhytm}
                            />
                        </div>
                    </div>
                    <TextField
                        label={Lang.songText}
                        className='mt-5'
                        multiline
                        helperText={Lang.songTextHelper}
                        onChange={onChangeInput}
                        name='songText'
                        value={songParams.song.songText}
                    />
                    <TextField
                        label={Lang.songVideo}
                        className='mt-3'
                        multiline
                        helperText={Lang.songVideoHelper}
                        onChange={onChangeInput}
                        name='songVideo'
                        value={songParams.song.songVideo}
                    />

                    {songList.loading ? <Loader/> :
                        <div className='form-buttons-container'>
                            <Button variant="outlined" className='positive-button' onClick={handleSubmit}
                                    type="submit">{Lang.saveButton}</Button>
                            <Button variant="text"
                                    onClick={cancelEdit}
                                    className='negative-button'
                            >{Lang.cancelButton}</Button>
                        </div>
                    }
                </form>
            </div>
    )
})

export default EditSongForm;

