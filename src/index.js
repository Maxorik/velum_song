import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyCrXVcJr7jCU9D7VUNgOCr20e0liUt1kTk",
    authDomain: "velum-song-list.firebaseapp.com",
    databaseURL: "https://velum-song-list-default-rtdb.firebaseio.com",
    projectId: "velum-song-list",
    storageBucket: "velum-song-list.appspot.com",
    messagingSenderId: "250238502704",
    appId: "1:250238502704:web:dc31f7158a2eb61841eaf5",
    measurementId: "G-TX0861TSM9"
};
const app = initializeApp(firebaseConfig);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
