import React, { useState, useEffect } from 'react';
import { Music, X } from 'lucide-react';
import '../MusicMenu.css';

export const MusicMenu = ({ currentScene }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const sceneTracks = {
    Forest: [
      { id: 1, icon: <img src="/icons/sun.png" alt="Sunny" className="weather-icon" />, src: '/Asset/forest-sunny.mp3' },
      { id: 2, icon: <img src="/icons/wind.png" alt="Windy" className="weather-icon" />, src: '/Asset/forest-windy.mp3' },
      { id: 3, icon: <img src="/icons/rain.png" alt="Rainy" className="weather-icon" />, src: '/Asset/forest-rainy.mp3' },
      { id: 4, icon: <img src="/icons/snow.png" alt="Snowy" className="weather-icon" />, src: '/Asset/forest-snowy.mp3' },
    ],
    Ocean: [
      { id: 1, icon: <img src="/icons/sun.png" alt="Sunny" className="weather-icon" />, src: '/Asset/sunny-beach.mp3' },
      { id: 2, icon: <img src="/icons/wind.png" alt="Windy" className="weather-icon" />, src: '/Asset/windy-beach.mp3' },
      { id: 3, icon: <img src="/icons/rain.png" alt="Rainy" className="weather-icon" />, src: '/Asset/rainy-beach.mp3' },
      { id: 4, icon: <img src="/icons/snow.png" alt="Snowy" className="weather-icon" />, src: '/Asset/snowy-beach.mp3' },
    ],
  };

  const tracks = sceneTracks[currentScene] || [];
  // Always use sunny version (id: 1) as default for each scene
const defaultTrack = tracks.find(track => track.id === 1);

  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

  const handleTrackSelect = (track) => {
    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(track.src);
    newAudio.addEventListener('ended', () => {
      newAudio.currentTime = 0;
      newAudio.play();
    });

    setAudio(newAudio);
    newAudio.play();
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!audio && defaultTrack) {
      handleTrackSelect(defaultTrack);
      return;
    }
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-menu">
      <button className="music-icon" onClick={toggleDropdown}>
        {isDropdownVisible ? <X size={24} /> : <Music size={24} />}
      </button>

      {isDropdownVisible && (
        <div className="music-dropdown">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="music-option"
              onClick={() => handleTrackSelect(track)}
            >
              {track.icon}
            </div>
          ))}
          <div className="music-controls">
            <button className="control-button" onClick={togglePlayPause}>
              <img
                src="/icons/pnp.png"
                alt={isPlaying ? "Stop" : "Play"}
                className="control-icon"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};