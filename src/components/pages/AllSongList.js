/**
 * Форма для отображения списка песен
 */

import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite'
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Lang from "../../settings/lang-ru";
import Loader from "../ui/Loader/Loader";
import ShowSong from "./ShowSong";
import EditSong from "./EditSong";
import songList from "../store/songList";
import songParams from "../store/songParams";
import axios from "axios";
import appSettings from "../../settings/global";

const AllSongList = observer(() => {
    const [editMode, setEditMode] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        songList.getSongList();
    }, []);

    function setViewMode(isEdit) {
        setEditMode(isEdit);
    }

    function addSong(){
        const song = {
            chordCouplet: 'C Cm D Dm E Em',
            chordChorus: 'F Fm G Gm A Am H Hm',
            songName: 'Песня новая',
            songComment: 'все стерлось',
            songText: 'ыыы ыыыы  ыыыы ыы ы',
            songVideo: 'https://www.youtube.com/watch?v=I_aBmrYChfQ&list=FLrPlJSnJjuo6QsdhBJuNduQ&index=2',
            rhytmCouplet: '🡻🡻🡹🡻🡻🡹🡻🡹',
            rhytmChorus: '🡻🡻🡹🡻🡻🡹🡻🡹',
        };

        axios.post(appSettings.apiSonglist + '.json', song);
    }

    return(
        <div>
            <button onClick={addSong}>Добавить</button>
            {songList.loading ? <Loader/> :
                !songList.songsInfo || songList.songsInfo.length === 0 ? <p>{Lang.noSongs}</p> :
                <div className='song-container'>
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