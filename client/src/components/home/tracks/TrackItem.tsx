'use client'

import { ITrack } from "@/shared/types/track.interface";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from './tracks.module.scss';
import Image from "next/image";

interface TrackItemProps {
  track: ITrack;
  isActive: boolean;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export function TrackItem({ track, isActive, isPlaying, onPlayPause }: TrackItemProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    function updateCurrentTime() {
      setCurrentTime(audioRef.current!.currentTime);
    }

    function updateDuration() {
      setDuration(audioRef.current!.duration);
    }
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener('timeupdate', updateCurrentTime);
      audioElement.addEventListener('loadedmetadata', updateDuration);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', updateCurrentTime);
        audioElement.removeEventListener('loadedmetadata', updateDuration);
      }
    };
  }, [audioRef]);

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    if (audioRef.current) {
      if (isActive && isPlaying) {
        const seekTime = Number(e.target.value);
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
      }
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      if (isActive && isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isActive, isPlaying]);


  return (
    <div className={styles.track}>
      <audio ref={audioRef} src={track.audio} />
      <div className="flex items-center justify-center gap-6 mx-3">
        <button onClick={onPlayPause}>
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <Image width={70} height={70} alt={track.name} src={track.picture} className="rounded-lg" />
        <div className="w-40">
          <div>{track.name}</div>
          <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
        </div>
      </div>
      <div className="flex w-full max-w-[650px] mx-2 gap-3">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={isPlaying ? currentTime : 0}
          onChange={handleSeek}
          style={{ width: '100%' }}
        />
        <div className="flex w-[150px]">
          {isPlaying ? new Date(currentTime * 1000).toISOString().substr(14, 5) : "00:00"} /
          {isPlaying ? new Date(duration * 1000).toISOString().substr(14, 5) : " 00:00"}
        </div>
      </div>
    </div>
  );
}

export default TrackItem;