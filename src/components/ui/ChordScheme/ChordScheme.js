/**
 *  Отрисовка аккорда по его названию
 *  Функция возвращает svg
 *
 *  Принцип отрисовки:
 <circle stroke-width="0.25" stroke={mainColor} fill={mainColor} cx="10" cy="30" r="4"></circle>
 cx="10" - смещение кружочка по Х (для струн 6-1: 0,10,20,30,40,50) = n*10
 cy="30" - по У                   (для ладов 1-4: 6,18,30,42)
 r="4"   - радиус. Открытая струна r=2, зажатая r=4

 X - глушение струны (у нее лад = -1)
 <text font-size="0.7rem" fill={mainColor} font-family="Verdana" text-anchor="middle" x="0" y="-2">x</text>
 x="0" - изменять для определенной струны. 0 - для первой

 Баррэ складывается из трех элементов: два кружка (конец и начало) и палка между ними.
 Палка:
 <rect fill={mainColor} x="0" y="38" width="50" height="8"></rect>
 x - начало палки, как и смещение кружка = (для струн 6-1: 0,10,20,30,40,50)
 y - лад                                   (для ладов 1-4: 2,14,26,38)
 width - размер, 10 * (кол-во струн - 1)
 */

import React from 'react';
import guitarChords from "../../../lib/guitar";
import './chord_scheme.css'

function ChordScheme(props) {
    const chordsList = guitarChords.chords;                          // список всех гитарных аккордов, разбитый по группам
    const isSharp = props.chordName[1] === '#' ? 'sharp' : '';
    const thisChordType = chordsList[props.chordName[0] + isSharp];  // список вариаций аккорда выбранной буквы (A\C\G etc) а также F# и C#
    let chordData = null;      // информация о текущем аккорде
    let strings = [
        {y:0, r:0},
        {y:0, r:0},
        {y:0, r:0},
        {y:0, r:0},
        {y:0, r:0},
        {y:0, r:0}
    ];
    const mainColor = '#e8eaed';

    // поиск информации об аккорде в библиотеке
    for(let chord in thisChordType) {
        let chordParams = thisChordType[chord];
        if(props.chordName.toLowerCase() === (chordParams.key + chordParams.suffix).toLowerCase()) {
            chordData = chordParams;
        }
    }

    // аккорд валидный
    if(chordData) {
        const chordScheme = chordData.positions[0];  // информация об одном из способов зажима аккорда
        const baseFret = chordScheme.baseFret > 1 ? chordScheme.baseFret: '';  // лад, с которого берется ааккорд

        // определяем, в каких местах зажимаются струны
        // TODO для поддержки укулеле меняется константа i<6 на i<4 (кол-во струн)
        for(let i=0; i<6; i++) {
            let position = chordScheme.frets[i];
            strings[i].y = (position + position - 1) * 6;
            strings[i].r = position > 0 ? 4 : 0;
        }

        // отрисовка барре
        // Прим.: все нижеследующие константы подобраны исходя из того, чтобы svg выглядела корректно
        function Barre() {
            if(chordScheme.barres.length > 0) {
                const barrePos = chordScheme.barres[0];
                const barreBegin = chordScheme.frets.indexOf(barrePos);
                const barreEnd = chordScheme.frets.lastIndexOf(barrePos);
                const barreX = barreBegin * 10;
                const barreY = ((barrePos - 1) * 12) + 2;
                const barreW = 10 * (barreEnd - barreBegin);

                return (
                    <rect fill={mainColor} x={barreX} y={barreY} width={barreW} height="8"></rect>
                )
            } else return null;
        }

        // отрисовка глушенных струн
        function Jammings() {
            return (
                chordScheme.frets.map((pos, index) => {
                    return pos < 0 ? <text key={pos+index} fontSize="0.7rem" fill={mainColor} fontFamily="Verdana" textAnchor="middle" x={index * 10} y="-2">x</text>
                                   : null;
                })
            )
        }

        return (
            <div className='chord-scheme'>
                {!chordData ? null :
                    // TODO параметры viewBox должны масштабироваться
                    <svg width="100" height="100" viewBox="0 0 93 93">
                        <g transform="translate(20, 20)">
                            <g>
                                <path stroke={mainColor} strokeWidth="0.25" strokeLinecap="square" strokeLinejoin="square"
                                      d="M 0 0 H 50 M 0 12 H 50 M 0 24 H 50 M 0 36 H 50 M 0 48 H 50M 0 0 V 48 M 10 0 V 48 M 20 0 V 48 M 30 0 V 48 M 40 0 V 48 M 50 0 V 48"></path>
                                <path stroke={mainColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                      d="M 0 0 H 50"></path>
                            </g>
                            <g>
                                { Barre() }
                                { Jammings() }
                            </g>
                            <g>
                                <text fontSize="0.6rem" fill={mainColor} fontFamily="Verdana" textAnchor="middle" x="-8" y="9">{baseFret}</text>
                            </g>
                            <g>
                                <circle strokeWidth="0.25" stroke={mainColor} fill={mainColor} cx="0" cy={strings[0].y} r={strings[0].r}></circle>
                            </g>
                            <g>
                                <circle strokeWidth="0.25" stroke={mainColor} fill={mainColor} cx="10" cy={strings[1].y} r={strings[1].r}></circle>
                            </g>
                            <g>
                                <circle strokeWidth="0.25" stroke={mainColor} fill={mainColor} cx="20" cy={strings[2].y} r={strings[2].r}></circle>
                            </g>
                            <g>
                                <circle strokeWidth="0.25" stroke={mainColor} fill={mainColor} cx="30" cy={strings[3].y} r={strings[3].r}></circle>
                            </g>
                            <g>
                                <circle strokeWidth="0.25" stroke={mainColor} fill={mainColor} cx="40" cy={strings[4].y} r={strings[4].r}></circle>
                            </g>
                            <g>
                                <circle strokeWidth="0.25" stroke={mainColor} fill={mainColor} cx="50" cy={strings[5].y} r={strings[5].r}></circle>
                            </g>
                            <g>
                                <text fontSize="0.7rem" fill={mainColor} fontFamily="Verdana" textAnchor="middle" x="27" y="60">{chordData.key + chordData.suffix}</text>
                            </g>
                        </g>
                    </svg>
                }
            </div>
        )
    } else {
        return (
            <div>
                <svg width="100" height="100" viewBox="0 0 93 93">
                    <g transform="translate(20, 20)">
                        <g>
                            <path stroke={mainColor} strokeWidth="0.25" strokeLinecap="square" strokeLinejoin="square"
                                  d="M 0 0 H 50 M 0 12 H 50 M 0 24 H 50 M 0 36 H 50 M 0 48 H 50M 0 0 V 48 M 10 0 V 48 M 20 0 V 48 M 30 0 V 48 M 40 0 V 48 M 50 0 V 48"></path>
                            <path stroke={mainColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                  d="M 0 0 H 50"></path>
                        </g>
                        <g>
                            <text fontSize="2.6rem" fill={mainColor} fontFamily="Verdana" textAnchor="middle" x="25" y="40">?</text>
                        </g>
                        <g>
                            <text fontSize="0.7rem" fill={mainColor} fontFamily="Verdana" textAnchor="middle" x="27" y="60">{props.chordName}</text>
                        </g>
                    </g>
                </svg>
            </div>
        )
    }
}

export default ChordScheme;