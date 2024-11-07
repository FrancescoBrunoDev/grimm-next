"use client";
import { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

interface AudioPlayerProps {
  tracks: {
    name: string;
    artist: string;
    src: string;
  }[];
}

interface ControlsProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  audioContextRef: React.MutableRefObject<AudioContext | undefined>;
  gainNodeRef: React.MutableRefObject<GainNode | undefined>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  tracksLength: number;
  currentTrackIndex: number;
  setCurrentTrackIndex: (index: number) => void;
}

const Controls: React.FC<ControlsProps> = ({
  audioRef,
  audioContextRef,
  gainNodeRef,
  isPlaying,
  setIsPlaying,
  tracksLength,
  currentTrackIndex,
  setCurrentTrackIndex,
}) => {
  const fadeIn = (duration: number = 500) => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        0,
        audioContextRef.current!.currentTime,
      );
      gainNodeRef.current.gain.linearRampToValueAtTime(
        1,
        audioContextRef.current!.currentTime + duration / 1000,
      );
    }
  };

  const fadeOut = (duration: number = 1000) => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(
        0,
        audioContextRef.current!.currentTime + duration / 1000,
      );
    }
  };

  const handlePlayPause = async () => {
    if (!isPlaying) {
      await audioContextRef.current?.resume();
      audioRef.current?.play();
      fadeIn();
    } else {
      fadeOut();
      setTimeout(() => {
        audioRef.current?.pause();
      }, 500);
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % tracksLength;
    setCurrentTrackIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentTrackIndex - 1 + tracksLength) % tracksLength;
    setCurrentTrackIndex(prevIndex);
  };

  return (
    <div className="flex w-full max-w-sm justify-between sm:max-w-32">
      <button onClick={handlePrev}>
        <SkipBack className="hover:fill-black" />
      </button>
      <button onClick={handlePlayPause}>
        {isPlaying ? (
          <Pause className="hover:fill-black" />
        ) : (
          <Play className="hover:fill-black" />
        )}
      </button>
      <button onClick={handleNext}>
        <SkipForward className="hover:fill-black" />
      </button>
    </div>
  );
};

interface TimelineProps {
  progress: number;
  duration: number;
  onChange: (time: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({
  progress,
  duration,
  onChange,
}) => {
  const formatTime = (time: number) => {
    return `${Math.floor(time / 60)}:${Math.floor(time % 60)
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSliderChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    onChange(pos * duration);
  };

  return (
    <div className="flex w-full flex-row items-center gap-2 text-sm">
      <span className="w-8 text-right">{formatTime(progress)}</span>
      <div
        className="w-100 h-2 flex-grow cursor-pointer rounded-full bg-black/40"
        onClick={handleSliderChange}
      >
        <div
          className="h-full rounded-full bg-black"
          style={{
            width: `${duration ? (progress / duration) * 100 : 0}%`,
          }}
        />
      </div>
      <span>{formatTime(duration)}</span>
    </div>
  );
};

interface PlaylistProps {
  tracks: AudioPlayerProps["tracks"];
  currentTrackIndex: number;
  isPlaying: boolean;
  onTrackSelect: (index: number) => void;
}

const Playlist: React.FC<PlaylistProps> = ({
  tracks,
  currentTrackIndex,
  isPlaying,
  onTrackSelect,
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        {tracks.map((track, index) => (
          <button
            key={index}
            onClick={() => onTrackSelect(index)}
            className={`flex w-full items-center justify-between rounded-md p-2 text-left transition hover:bg-black/5 ${
              currentTrackIndex === index ? "bg-black/10" : ""
            }`}
          >
            <div>
              <div className="font-medium">{track.name}</div>
              <div className="text-sm text-black/70">{track.artist}</div>
            </div>
            {currentTrackIndex === index && isPlaying && (
              <div className="text-sm">Playing</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ tracks }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext>();
  const gainNodeRef = useRef<GainNode>();
  const sourceNodeRef = useRef<MediaElementAudioSourceNode>();

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    const setAudioDuration = () => {
      setDuration(audio?.duration || 0);
    };

    if (audio) {
      audio.addEventListener("loadedmetadata", setAudioDuration);
      // Set duration if audio is already loaded
      if (audio.readyState >= 2) {
        setAudioDuration();
      }
    }

    return () => {
      audio?.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    // Initialize Audio Context
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    gainNodeRef.current = audioContextRef.current.createGain();
    gainNodeRef.current.connect(audioContextRef.current.destination);

    if (audioRef.current && !sourceNodeRef.current) {
      sourceNodeRef.current = audioContextRef.current.createMediaElementSource(
        audioRef.current,
      );
      sourceNodeRef.current.connect(gainNodeRef.current);
    }

    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const handleTimelineChange = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }
  }, [currentTrackIndex, isPlaying]);

  return (
    <div className="flex w-full flex-col items-center gap-2 rounded-lg bg-white p-4 text-black">
      <Playlist
        tracks={tracks}
        currentTrackIndex={currentTrackIndex}
        isPlaying={isPlaying}
        onTrackSelect={setCurrentTrackIndex}
      />
      <div className="w-full">
        <audio
          ref={audioRef}
          src={currentTrack.src}
          onTimeUpdate={(e) => {
            setProgress(e.currentTarget.currentTime);
          }}
          onEnded={() => {
            const nextIndex = (currentTrackIndex + 1) % tracks.length;
            setCurrentTrackIndex(nextIndex);
          }}
        ></audio>
      </div>
      <div className="flex w-full flex-col items-center justify-start gap-2 sm:flex-row sm:gap-8">
        <Timeline
          progress={progress}
          duration={duration}
          onChange={handleTimelineChange}
        />
        <Controls
          audioRef={audioRef}
          audioContextRef={audioContextRef}
          gainNodeRef={gainNodeRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          tracksLength={tracks.length}
          currentTrackIndex={currentTrackIndex}
          setCurrentTrackIndex={setCurrentTrackIndex}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
