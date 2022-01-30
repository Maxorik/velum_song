/**
 * Интерфейс для входа под пользователем
 */

import React, {useEffect, useState} from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Lang from "../../../settings/lang-ru";
import global from "../../../settings/global";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import PersonIcon from '@material-ui/icons/Person';
import TextField from "@material-ui/core/TextField";
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import './authentication.css'

function Authentication() {
    const [openAuthModal, setModalOpen] = useState(false);
    const [password, setPassword] = useState();
    const [invalidPass, hideInvalidPass] = useState(true);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    useEffect(() => {
        setPassword('');
        hideInvalidPass(true);
    }, [openAuthModal]);

    function onInputPassword(event) {
        setPassword(event.target.value);
    }

    function login() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, global.myEmail, password)
            .then((userCredential) => {
                handleClose();
                global.isAdmin = true;
            })
            .catch((error) => {
                hideInvalidPass(false);
            });
    }

    return (
        <div>
            {
                global.isAdmin ? <LibraryMusicIcon className='library-music-icon'/> :
                    <Button
                        variant="outlined"
                        startIcon={<PersonIcon />}
                        className='positive-button small-button'
                        onClick={handleOpen}
                    >{Lang.enterButton}</Button>
            }
            <Modal
                open={openAuthModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='modal-window auth-modal-window'>
                    <Typography id="authModal" component={'span'} className='auth-modal-window-dialog'>
                        <p>{Lang.enterPassText}</p>
                        <TextField
                            label={Lang.passInput}
                            onChange={onInputPassword}
                            value={password}
                            className='auth-modal-window-text'
                            type='password'
                        />
                        <p
                            hidden={invalidPass}
                            className='auth-invalid-pass'
                        >
                            {Lang.invalidPass}
                        </p>
                        <div className='modal-buttons'>
                            <Button variant="outlined" className='positive-button' onClick={login}>{Lang.enterButton}</Button>
                            <Button variant="text" onClick={handleClose}>{Lang.cancelButton}</Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default Authentication;