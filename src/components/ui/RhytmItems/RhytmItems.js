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
import Lang from "../../../settings/lang-ru";

function RhytmItems(props) {
    return (
        <div>
            <TextField label={Lang[props.type]} className='mt-1 form-view-half' helperText={Lang.rhytmHelper} InputProps={{readOnly: true}} value={props.value}/>
            <div className='buttons-panel mt-1'>
                <Button variant="outlined" startIcon={<ArrowUpwardIcon />} className='icon-square-button' name='arrowUp' rhytmtype={props.type} onClick={props.onChange}/>
                <Button variant="outlined" startIcon={<ArrowDownwardIcon />} className='icon-square-button' name='arrowDown' rhytmtype={props.type} onClick={props.onChange}/>
                <Button variant="outlined" startIcon={<ExpandLessIcon />} className='icon-square-button' name='arrowUpLess' rhytmtype={props.type} onClick={props.onChange}/>
                <Button variant="outlined" startIcon={<ExpandMoreIcon />} className='icon-square-button' name='arrowDownLess' rhytmtype={props.type} onClick={props.onChange}/>
                <Button variant="outlined" startIcon={<ClearIcon />} className='icon-square-button' name='jamming' rhytmtype={props.type} onClick={props.onChange}/>
                <Button variant="outlined" startIcon={<BackspaceIcon />} className='icon-square-button' style={{backgroundColor: '#D23333'}} name='clear' rhytmtype={props.type} onClick={props.onChange}/>
            </div>
            <div className='buttons-panel'>
                {/*TODO заменить кнопки на выпадающий список*/}
                <Button variant="contained" className='preset-button' name='rhytm8' rhytmtype={props.type} onClick={props.onChange}>{Lang.rhytm8}</Button>
                <Button variant="contained" className='preset-button' name='rhytm6' rhytmtype={props.type} onClick={props.onChange}>{Lang.rhytm6}</Button>
                <Button variant="contained" className='preset-button' name='rhytm4' rhytmtype={props.type} onClick={props.onChange}>{Lang.rhytm4}</Button>
                <Button variant="contained" className='preset-button' name='rhytmGalop' rhytmtype={props.type} onClick={props.onChange}>{Lang.rhytmGalop}</Button>
            </div>
        </div>
    )
}

export default RhytmItems;