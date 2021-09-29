/**
 * Форма для добавления трека
 */

import React from 'react';
import Lang from './main/settings/lang-ru';
import RhytmItems from './interfaceComponents/RhytmItems';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Loader from './main/Loader';

class EditSongForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:  false,
            songData: {
                chordCouplet:   '',
                chordChorus:    '',
                songName:       '',
                songComment:    '',
                songText:       '',
                songVideo:      '',
                rhytmCouplet:   '',
                rhytmChorus:    ''
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            loading: true
        });

        axios.post('https://velum-song-default-rtdb.firebaseio.com/songs.json', this.state.songData)
            .then(response => {
                this.setState({
                    loading: false
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    loading: false
                });
            })
    }

    onChangeInput = (event) => {
        const chordMaskRe = /^[\w\s#]+$/;
        const value = event.target.value;
        const name =  event.target.name;

        if(name === 'chordCouplet' || name === 'chordChorus') {
            if (!value || chordMaskRe.test(value)) {
                this.setState({
                    songData: {
                        ...this.state.songData,
                        [name]: value
                    }
                })
            }
        } else {
            this.setState({
                songData: {
                    ...this.state.songData,
                    [name]: value
                }
            })
        }
    };

    onChangeRhytm = (event) => {
        const key = event.currentTarget.name;
        const rhytmtype = event.currentTarget.getAttribute('rhytmtype');
        const rhytmBook = {
            'arrowUp':        '🡹',
            'arrowDown':      '🡻',
            'arrowUpLess':    '🡅',
            'arrowDownLess':  '🡇',
            'jamming':        '✖',
            'rhytm8':         '🡻🡻🡹🡻🡻🡹🡻🡹 (8)',
            'rhytm6':         '🡻🡻🡹🡹🡻🡹 (6)',
            'rhytm4':         '🡻🡹🡻🡹 (4)',
            'rhytmGalop':     '🡻🡻🡹🡻🡻🡹🡻🡻🡹🡻'
        };

        if(key === 'clear') {
            this.setState({
                songData: {
                    ...this.state.songData,
                    [rhytmtype]: ''
                }
            })
        } else {
            this.setState({
                songData: {
                    ...this.state.songData,
                    [rhytmtype]: this.state.songData[rhytmtype] + rhytmBook[key]
                }
            })
        }
    };

    render() {
        return(
            <form className='form-view' onSubmit={this.handleSubmit}>
                <h3>{Lang.addSongTitle}</h3>
                <TextField
                    label={Lang.songName}
                    className='mt-3'
                    name='songName'
                    onChange={this.onChangeInput}
                />
                <TextField
                    label={Lang.songComment}
                    helperText={Lang.songCommentHelper}
                    className='mt-3' multiline
                    name='songComment'
                    onChange={this.onChangeInput}
                />
                <div className='mt-5 flex-row-container'>
                    <div>
                        <h5>{Lang.coupletTitle}</h5>
                        <TextField
                            name="chordCouplet"
                            label={Lang.chordCouplet}
                            helperText={Lang.chordHelper}
                            className='form-view-half'
                            onChange={this.onChangeInput}
                        />
                        <RhytmItems
                            type={'rhytmCouplet'}
                            value={this.state.songData.rhytmCouplet}
                            onChange={this.onChangeRhytm}
                        />
                    </div>
                    <div className='form-view-half'>
                        <h5>{Lang.chorusTitle}</h5>
                        <TextField
                            name="chordChorus"
                            label={Lang.chordChorus}
                            helperText={Lang.chordHelper}
                            className='form-view-half'
                            onChange={this.onChangeInput}
                        />
                        <RhytmItems
                            type={'rhytmChorus'}
                            value={this.state.songData.rhytmChorus}
                            onChange={this.onChangeRhytm}
                        />
                    </div>
                </div>
                <TextField
                    label={Lang.songText}
                    className='mt-5'
                    multiline
                    helperText={Lang.songTextHelper}
                    onChange={this.onChangeInput}
                    name='songText'
                />
                <TextField
                    label={Lang.songVideo}
                    className='mt-3'
                    multiline
                    helperText={Lang.songVideoHelper}
                    onChange={this.onChangeInput}
                    name='songVideo'
                />

                {this.state.loading ? <Loader /> :
                <div className='form-buttons-container'>
                    <Button variant="contained" className='positive-button' onClick={this.sendData} type="submit">{Lang.saveButton}</Button>
                    <Button variant="contained" className='positive-button'>{Lang.previewButton}</Button>
                    <Button variant="contained">{Lang.cancelButton}</Button>
                </div>}
            </form>
        );
    }
}

export default EditSongForm;

