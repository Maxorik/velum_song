import './styles/App.css'
import './styles/mobile.css'
import './styles/overridesMUI.css'
import './styles/scrollbar.css'
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
