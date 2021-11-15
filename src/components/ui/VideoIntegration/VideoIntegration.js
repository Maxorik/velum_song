/**
 * Возвращает youtube-видео вставку
 */

import React from 'react';
import './VideoIntegration.css'

function VideoIntegration(props) {
    const videoCode = props.link.split('=');
    const videoLink = 'https://www.youtube.com/embed/' + videoCode[1];
    return(
        <div className='videoContainer'>
            {
                videoCode[1] &&
                    <iframe width="560"
                            height="315"
                            src = {videoLink}
                            title=""
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                    >
                    </iframe>
            }
        </div>
    )
}

export default VideoIntegration;