import React, { useEffect, useState } from 'react';
import * as play from "../audio/countdown.mp3";
const Sound = ({}) => {
	const playAudio = () => {
		const audioEl = document.getElementsByClassName("audio-element")[0]
		audioEl.play()
	};
	
    return (
		<div>
		  <button onClick={playAudio}>
			<span>Play Audio</span>
		  </button>
		  <audio className="audio-element">
			<source src="https://drive.google.com/file/d/1ejzvHqfCotoeNqV59v4kN4LYw0yby0aX/view"></source>
		  </audio>
		</div>
	  );
};

export default Sound;