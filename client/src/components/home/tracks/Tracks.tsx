"use client"

import { useFindAllTracksQuery } from "@/services/trackService"
import { Loader } from "lucide-react";
import { useState } from "react";
import { TrackItem } from "./TrackItem";
import styles from './tracks.module.scss'

export function Tracks() {
    const { data: tracks, isLoading } = useFindAllTracksQuery({})
    const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = (trackId: string) => {
        if (activeTrackId === trackId) {
            setIsPlaying(!isPlaying); // Меняем состояние play/pause для текущего трека
          } else {
            setActiveTrackId(trackId);
            setIsPlaying(true); // Воспроизводим новый трек
          }
      };
    

    if (!tracks || isLoading) return <Loader />

    return (
        <div className={styles.tracks_container}>
            <h1>Треки</h1>
            <div className={styles.tracks}>
                {tracks
                    .filter((_, i) => i < 10)
                    .map((track) =>
                        <TrackItem
                            key={track.id}
                            track={track}
                            isActive={track.id === activeTrackId}
                            isPlaying={track.id === activeTrackId && isPlaying}
                            onPlayPause={() => handlePlayPause(track.id)}
                        />
                    )
                }
            </div>
        </div>
    )
}