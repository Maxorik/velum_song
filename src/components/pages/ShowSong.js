/**
 * Форма для просмотра информации о песне
 */

import React, {useState} from 'react';
import {observer} from 'mobx-react-lite'
import Lang from "../../settings/lang-ru";
import global from "../../settings/global";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import ChordScheme from "../ui/ChordScheme/ChordScheme";
import VideoIntegration from "../ui/VideoIntegration/VideoIntegration";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import songParams from "../store/songParams";
import songList from "../store/songList";
import Typography from "@material-ui/core/Typography";

const ShowSong = observer((props) => {
    const songData = props.songData[1];
    const chordsCouplet = songData.chordCouplet.split(' ');
    const chordsChorus = songData.chordChorus.split(' ');
    const [deleteConfirmModalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    function setEditMode() {
        songParams.setSong(props.songData[1]);
        songParams.changeParam('songId', props.songData[0]);
        props.setMode();
    }

    function deleteSong() {
        songList.loading = true;
        songList.deleteSong(props.songData[0]);
    }

    return(
        <div className='form-view'>
            <div className='buttons-container'>
                <Button
                    variant="text"
                    startIcon={<EditIcon />}
                    className='positive-button small-button'
                    onClick={setEditMode}
                    disabled={!global.isAdmin}
                >
                    {Lang.editButton}
                </Button>
                <Button
                    variant="text"
                    startIcon={<DeleteForeverIcon />}
                    className='small-button'
                    onClick={handleOpen}
                    disabled={!global.isAdmin}
                >
                    {Lang.deleteButton}
                </Button>
                <Modal
                    open={deleteConfirmModalOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className='modal-window'>
                        <Typography id="deleteConfirmModalOpen" component={'span'} className='modal-window-dialog'>
                            <p>{Lang.langWithParams(Lang.deleteConfirmText, songData.songName)}</p>
                            <div className='modal-buttons'>
                                <Button variant="outlined" className='positive-button' onClick={deleteSong}>{Lang.deleteButton}</Button>
                                <Button variant="text" onClick={handleClose}>{Lang.cancelButton}</Button>
                            </div>
                        </Typography>
                    </Box>
                </Modal>
            </div>
            <h2>{songData.songName}</h2>
            <pre className='song-description'>{songData.songComment}</pre>
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