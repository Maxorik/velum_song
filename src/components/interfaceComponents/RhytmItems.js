/**
 *  Возвращает интерфейс для ввода ритмического рисунка
 */

import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import BackspaceIcon from '@material-ui/icons/Backspace';
import TextField from '@material-ui/core/TextField'
import Lang from "../main/settings/lang-ru";
import EditSongForm from "../EditSong";

class RhytmItems extends React.Component {
    render() {
        return(
            <div>
                <TextField label={Lang[this.props.type]} className='mt-1 form-view-half' helperText={Lang.rhytmHelper} InputProps={{readOnly: true}} value={this.props.value}/>
                <div className='buttons-panel mt-1'>
                    <Button variant="outlined" startIcon={<ArrowUpwardIcon />} className='icon-square-button' name='arrowUp' rhytmtype={this.props.type} onClick={this.props.onChange}/>
                    <Button variant="outlined" startIcon={<ArrowDownwardIcon />} className='icon-square-button' name='arrowDown' rhytmtype={this.props.type} onClick={this.props.onChange}/>
                    <Button variant="outlined" startIcon={<ExpandLessIcon />} className='icon-square-button' name='arrowUpLess' rhytmtype={this.props.type} onClick={this.props.onChange}/>
                    <Button variant="outlined" startIcon={<ExpandMoreIcon />} className='icon-square-button' name='arrowDownLess' rhytmtype={this.props.type} onClick={this.props.onChange}/>
                    <Button variant="outlined" startIcon={<ClearIcon />} className='icon-square-button' name='jamming' rhytmtype={this.props.type} onClick={this.props.onChange}/>
                    <Button variant="outlined" startIcon={<BackspaceIcon />} className='icon-square-button' style={{backgroundColor: '#D23333'}} name='clear' rhytmtype={this.props.type} onClick={this.props.onChange}/>
                </div>
                <div className='buttons-panel'>
                    {/*TODO заменить кнопки на выпадающий список*/}
                    <Button variant="contained" className='preset-button' name='rhytm8' rhytmtype={this.props.type} onClick={this.props.onChange}>{Lang.rhytm8}</Button>
                    <Button variant="contained" className='preset-button' name='rhytm6' rhytmtype={this.props.type} onClick={this.props.onChange}>{Lang.rhytm6}</Button>
                    <Button variant="contained" className='preset-button' name='rhytm4' rhytmtype={this.props.type} onClick={this.props.onChange}>{Lang.rhytm4}</Button>
                    <Button variant="contained" className='preset-button' name='rhytmGalop' rhytmtype={this.props.type} onClick={this.props.onChange}>{Lang.rhytmGalop}</Button>
                </div>
            </div>
        )
    }
}

export default RhytmItems;