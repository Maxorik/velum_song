import React, {useState} from "react";
import global from "../../../settings/global";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Lang from "../../../settings/lang-ru";
import Authentication from "../Authentication/Authentication";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import EditSong from "../../pages/EditSong";
import './header.css'

function Header() {
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    return(
        <div className='songlist-header'>
            <div style={{display: 'flex'}}>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    className='positive-button'
                    onClick={handleOpen}
                    disabled={!global.isAdmin}
                >{Lang.addSongButton}
                </Button>
                <Authentication/>
            </div>
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
                            isNewSong
                            key='newsong'
                            isModal={handleClose}
                        />
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default Header;