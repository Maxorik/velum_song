/**
 * Форма для отображения списка песен
 */

import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite'
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Lang from "../../settings/lang-ru";
import Loader from "../ui/Loader/Loader";
import ShowSong from "./ShowSong";
import EditSong from "./EditSong";
import songList from "../store/songList";
import global from "../../settings/global";

const AllSongList = observer(() => {
    const [editMode, setEditMode] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    useEffect(() => {
        songList.getSongList();
    }, []);

    function setViewMode() {
        setEditMode(prev => !prev);
    }

    return(
        <div>
            {songList.loading ? <Loader/> :
                !songList.songsInfo || songList.songsInfo.length === 0 ? <p>{Lang.noSongs}</p> :
                <div className='song-container'>
                    <div className='songlist-header'>
                        <p>{global.product}</p>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className='positive-button'
                            onClick={handleOpen}
                        >{Lang.addSongButton}
                        </Button>
                        <Modal
                            open={modalOpen}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className='modal-window'>
                                <Typography id="modal-modal-description" component={'span'}>
                                    <EditSong
                                        songData={null}
                                        setMode={setViewMode}
                                        key='newsong'
                                        isModal={handleClose}
                                    />
                                </Typography>
                            </Box>
                        </Modal>
                    </div>
                    {songList.songsInfo.map((song) =>
                        {
                            return (
                                <Accordion key={song[0]} expanded={expanded === 'panel' + song[0]} onChange={handleChange('panel' + song[0])}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                            {song[1].songName}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography component={'span'}>
                                            {
                                                editMode ? <EditSong
                                                    songData={song}
                                                    setMode={setViewMode}
                                                    key={song[0]}
                                                /> : <ShowSong
                                                    songData={song}
                                                    setMode={setViewMode}
                                                    key={song[0]}
                                                />
                                            }
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
})

export default AllSongList;