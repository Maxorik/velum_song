/**
 * Форма для добавления трека
 */

import React, {useState} from 'react';
import Lang from "../../settings/lang-ru";
import RhytmItems from "../ui/RhytmItems/RhytmItems";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Loader from "../ui/Loader/Loader";
import ShowSong from './ShowSong'

function EditSongForm() {
    const [loading, setLoading] = useState(false);
    const [trackInfo, showTrackInfo] = useState(false);
    const [songData, setSongData] = useState({
        chordCouplet: 'A F G G5',
        chordChorus: 'Am C5 A B',
        songName: 'Поросенок Петр',
        songComment: 'Песня поется про поросенка Петра, который съебывает из рашки на сраном тракторе',
        songText: 'Em\n' +
            'Спиздив сраный трактор,\n' +
            'Am\n' +
            'Съёбую из Рашки,\n' +
            'G\n' +
            'Поросенок Пётр\n' +
            'Bm\n' +
            'В беленькой рубашке.\n' +
            '\n' +
            'Em\n' +
            'Я уеду нахуй,\n' +
            'Am\n' +
            'Я съебусь отсюда.\n' +
            'G\n' +
            'Спиздив сраный трактор,\n' +
            'Bm\n' +
            'Я увижу чудо.\n' +
            '\n' +
            'Em\n' +
            'У меня вне Рашки\n' +
            'Am\n' +
            'Будет много тёлок,\n' +
            'G\n' +
            'Это тут Свинья я,\n' +
            'Bm\n' +
            'А там — Поросёнок.\n' +
            '\n' +
            'Em\n' +
            'Там меня полюбят\n' +
            'Am\n' +
            'За мою рубашку\n' +
            'G\n' +
            'И за то, что трактор\n' +
            'Bm\n' +
            'Спиздил я из Рашки.\n' +
            '\n' +
            'Em\n' +
            'Спиздив сраный трактор,\n' +
            'Am\n' +
            'Съёбую из Рашки,\n' +
            'G\n' +
            'Поросенок Пётр\n' +
            'Bm\n' +
            'В беленькой рубашке.',
        songVideo: 'https://www.youtube.com/watch?v=3odiESWcxRU',
        rhytmCouplet: '🡻🡻🡹🡻🡻🡹🡻🡹',
        rhytmChorus: '🡻🡻🡹🡻🡻🡹🡻🡹'
    });

    function handleSubmit(event) {
        event && event.preventDefault();
        setLoading(true);

        axios.post('https://velum-song-list-default-rtdb.firebaseio.com/songs.json', songData)
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

    function previewSong() {
        showTrackInfo(true);
    }

    return (<div>
            { trackInfo ? <ShowSong
                    songData={songData}
                    key={songData.songName}
                    showTrackInfo={showTrackInfo}
                    handleSubmit={handleSubmit}
                /> :
                <form className='form-view' onSubmit={handleSubmit}>
                    <h3>{Lang.addSongTitle}</h3>
                    <TextField
                        label={Lang.songName}
                        className='mt-3'
                        name='songName'
                        onChange={onChangeInput}
                        value={songData.songName}
                    />
                    <TextField
                        label={Lang.songComment}
                        helperText={Lang.songCommentHelper}
                        className='mt-3' multiline
                        name='songComment'
                        onChange={onChangeInput}
                        value={songData.songComment}
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
                                value={songData.chordCouplet}
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
                                value={songData.chordChorus}
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
                        value={songData.songText}
                    />
                    <TextField
                        label={Lang.songVideo}
                        className='mt-3'
                        multiline
                        helperText={Lang.songVideoHelper}
                        onChange={onChangeInput}
                        name='songVideo'
                        value={songData.songVideo}
                    />

                    {loading ? <Loader/> :
                        <div className='form-buttons-container'>
                            <Button variant="contained" className='positive-button' onClick={handleSubmit}
                                    type="submit">{Lang.saveButton}</Button>
                            <Button variant="contained" className='positive-button' onClick={previewSong}>{Lang.previewButton}</Button>
                            <Button variant="contained">{Lang.cancelButton}</Button>
                        </div>
                    }
                </form>
            }
        </div>
    )
}

export default EditSongForm;

