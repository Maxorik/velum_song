/**
 * Форма для отображения списка песен
 */

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Lang from "../../settings/lang-ru";
import Loader from "../ui/Loader/Loader";
import ShowSong from "./ShowSong";
import EditSong from "./EditSong";

function AllSongList() {
    const [songList, setSongList] = useState();
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        console.log('get songlist...');
        axios.get('https://velum-song-list-default-rtdb.firebaseio.com/songs.json').then(response => {
                const songParams = Object.entries(response.data);
                setSongList(songParams);
                setLoading(false);
             }).catch(error => console.log(error));
    }, []);

    function setViewMode(isEdit) {
        setEditMode(isEdit);
    }

    return(
        <div>
            {loading ? <Loader/> :
                !songList || songList.length === 0 ? <p>{Lang.noSongs}</p> :
                <div className='song-container'>
                    {
                        songList.map((song, index) => {
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
                                                    songData={song[1]}
                                                    setMode={setViewMode}
                                                    key={song[0]}
                                                /> : <ShowSong
                                                    songData={song[1]}
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
}

export default AllSongList;