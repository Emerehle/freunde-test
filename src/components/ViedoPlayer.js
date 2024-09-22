import freunde from '../BilderVideo/Freunde.mp4';
import games from '../BilderVideo/Games.mp4'
import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const handleMouseEnter = (e) => {
    e.target.play();
  };

  const handleMouseLeave = (e) => {
    e.target.pause();
  };

  const handleVideoClick = (url) => {
    window.location.href = url;
  }

  return (
    <div className="video-container">
        <div className='video-wrapper'>
          <div className='video-item'>
            <h2 className='haed'>Freunde</h2>
            <video className='video-player'
            autoPlay
            src= {freunde}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleVideoClick('/Freunde')} 
            />
          </div>
          <div className='video-item'>
            <h2 className='head'>Games</h2>  
            <video className='video-player' 
            src= {games}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleVideoClick('/Games')} 
            />
          </div>
        </div>
    </div>
  );
};

export default VideoPlayer;
