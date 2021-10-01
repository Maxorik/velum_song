/**
 * Форма для добавления трека
 */

import React, {useState} from 'react';
import Lang from './main/settings/lang-ru';
import RhytmItems from './interfaceComponents/RhytmItems';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Loader from './main/Loader/Loader';

function EditSongForm() {
    const [loading, setLoading] = useState(false);
    const [songData, setSongData] = useState({
        chordCouplet: '',
        chordChorus: '',
        songName: '',
        songComment: '',
        songText: '',
        songVideo: '',
        rhytmCouplet: '',
        rhytmChorus: ''
    });

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        axios.post('https://velum-song-default-rtdb.firebaseio.com/songs.json', songData)
            .then(response => {
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }

    function onChangeInput(event) {
        const chordMaskRe = /^[\w\s#]+$/;
        const value = event.target.value;
        const name = event.target.name;

        if (name === 'chordCouplet' || name === 'chordChorus') {
            if (!value || chordMaskRe.test(value)) {
                setSongData(prevState => ({
                    ...prevState,
                    [name]: value
                }))
            }
        } else {
            setSongData(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    }

    function onChangeRhytm(event) {
        const key = event.currentTarget.name;
        const rhytmtype = event.currentTarget.getAttribute('rhytmtype');
        const rhytmBook = {
            'arrowUp': '🡹',
            'arrowDown': '🡻',
            'arrowUpLess': '🡅',
            'arrowDownLess': '🡇',
            'jamming': '✖',
            'rhytm8': '🡻🡻🡹🡻🡻🡹🡻🡹 (8)',
            'rhytm6': '🡻🡻🡹🡹🡻🡹 (6)',
            'rhytm4': '🡻🡹🡻🡹 (4)',
            'rhytmGalop': '🡻🡻🡹🡻🡻🡹🡻🡻🡹🡻'
        };

        if (key === 'clear') {
            setSongData(prevState => ({
                ...prevState,
                [rhytmtype]: ''
            }))
        } else {
            setSongData(prevState => ({
                ...prevState,
                [rhytmtype]: prevState[rhytmtype] + rhytmBook[key]
            }))
        }
    }

    return (
        <form className='form-view' onSubmit={handleSubmit}>
            <h3>{Lang.addSongTitle}</h3>
            <TextField
                label={Lang.songName}
                className='mt-3'
                name='songName'
                onChange={onChangeInput}
            />
            <TextField
                label={Lang.songComment}
                helperText={Lang.songCommentHelper}
                className='mt-3' multiline
                name='songComment'
                onChange={onChangeInput}
            />
            <div className='mt-5 flex-row-container'>
                <div>
                    <h5>{Lang.coupletTitle}</h5>
                    <TextField
                        name="chordCouplet"
                        label={Lang.chordCouplet}
                        helperText={Lang.chordHelper}
                        className='form-view-half'
                        onChange={onChangeInput}
                    />
                    <RhytmItems
                        type={'rhytmCouplet'}
                        value={songData.rhytmCouplet}
                        onChange={onChangeRhytm}
                    />
                </div>
                <div className='form-view-half'>
                    <h5>{Lang.chorusTitle}</h5>
                    <TextField
                        name="chordChorus"
                        label={Lang.chordChorus}
                        helperText={Lang.chordHelper}
                        className='form-view-half'
                        onChange={onChangeInput}
                    />
                    <RhytmItems
                        type={'rhytmChorus'}
                        value={songData.rhytmChorus}
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
            />
            <TextField
                label={Lang.songVideo}
                className='mt-3'
                multiline
                helperText={Lang.songVideoHelper}
                onChange={onChangeInput}
                name='songVideo'
            />

            {loading ? <Loader/> :
                <div className='form-buttons-container'>
                    <Button variant="contained" className='positive-button' onClick={handleSubmit}
                            type="submit">{Lang.saveButton}</Button>
                    <Button variant="contained" className='positive-button'>{Lang.previewButton}</Button>
                    <Button variant="contained">{Lang.cancelButton}</Button>
                </div>}
        </form>
    )
}

export default EditSongForm;

