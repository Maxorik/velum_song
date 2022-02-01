import './App.css'
import './mobile.css'
import React from 'react'
import AllSongList from "./components/pages/AllSongList";
import Header from "./components/ui/Header/Header";

function App() {
    return (
      <div className="App">
          <Header/>
          <AllSongList />
      </div>
    );
}

export default App;
