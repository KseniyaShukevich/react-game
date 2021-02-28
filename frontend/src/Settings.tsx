import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Dialog,
} from '@material-ui/core';
import {
  MusicNote, MusicOff, VolumeUp, VolumeOff,
} from '@material-ui/icons';
import audioObj from './audioObj';

const useStyles = makeStyles((theme) => ({
  containerSettings: {
    padding: theme.spacing(2),
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(1),
  },
  subtitle: {
    paddingRight: theme.spacing(2.2),
  },
  icon: {
    marginRight: theme.spacing(1),
    '&:hover': {
      cursor: 'pointer',
    },
  },
  heading: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: theme.palette.primary.dark,
    paddingBottom: theme.spacing(2),
  },
}));

interface IProps {
  isAutoplay: boolean
  isMusic: boolean
  isSound: boolean
  music: any
  sound: any
  inputElMusic: any
  inputElSound: any
  isEndGame: boolean
  isSettings: boolean
  setIsSettings: (value: boolean) => void
  setIsMusic: (value: boolean) => void
  setIsSound: (value: boolean) => void
  startTime: () => void
}

const Statistics: React.FC<IProps> = ({
  isAutoplay,
  isMusic,
  isSound,
  music,
  sound,
  inputElMusic,
  inputElSound,
  isEndGame,
  isSettings,
  setIsSettings,
  setIsMusic,
  setIsSound,
  startTime,
}: IProps) => {
  const minVolume: number = 0;
  const maxVolume: number = 100;
  const classes = useStyles();
  const [volumeMusic, setVolumeMusic] = useState<number>(audioObj.get('Music') * maxVolume);
  const [volumeSound, setVolumeSound] = useState<number>(audioObj.get('Sound') * maxVolume);

  const saveAudio = (isAudio: boolean, volume: number, name: string): void => {
    if (isAudio) {
      audioObj.save(`${name}`, volume);
      audioObj.remove(`${name}No`);
    } else {
      audioObj.save(`${name}No`, 1);
    }
  };

  const toggleAudio = (
    isAudio: boolean, setIsFunc: any, setVolumeFunc: any, refEl: any, name: string,
  ): void => {
    if (isAudio) {
      setVolumeFunc(minVolume);
      refEl.current.volume = minVolume;
    } else {
      setVolumeFunc(audioObj.get(`${name}`) * maxVolume);
      refEl.current.volume = audioObj.get(`${name}`);
    }
    setIsFunc(!isAudio);
  };

  const changeVolume = (
    refEl: any, inputValue: number, setVolumeFunc: any, isAudio: boolean, setIsFunc: any,
  ): void => {
    refEl.current.volume = inputValue / maxVolume;
    setVolumeFunc(inputValue);
    if (!isAudio && inputValue) setIsFunc(true);
    if (!inputValue) setIsFunc(false);
  };

  const onClose = (): void => {
    setIsSettings(false);
    saveAudio(isMusic, music.current.volume, 'Music');
    saveAudio(isSound, sound.current.volume, 'Sound');
    if (!isEndGame && !isAutoplay) startTime();
  };

  const doNoMusic = (vMusic: boolean): void => {
    if (vMusic) {
      setIsMusic(false);
      music.current.volume = 0;
      setVolumeMusic(0);
    }
  };

  const doNoSound = (vSound: boolean): void => {
    if (vSound) {
      setIsSound(false);
      sound.current.volume = 0;
      setVolumeSound(0);
    }
  };

  useEffect(() => {
    const vMusic: boolean = audioObj.isNoVolume('Music');
    const vSound: boolean = audioObj.isNoVolume('Sound');

    doNoMusic(vMusic);
    doNoSound(vSound);
  }, []);

  return (
    <Dialog open={isSettings} onClose={onClose}>
      <div className={classes.containerSettings}>
        <Typography variant="h5" className={classes.heading}>settings</Typography>
        <div className={classes.container}>
          <Typography variant="subtitle1" className={classes.subtitle}>Music</Typography>
          <div onClick={() => toggleAudio(isMusic, setIsMusic, setVolumeMusic, music, 'Music')} className={classes.icon}>
            {
              isMusic
                ? <MusicNote />
                : <MusicOff />
            }
          </div>
          <input
            className={classes.icon}
            ref={inputElMusic}
            value={volumeMusic}
            min={minVolume}
            max={maxVolume}
            type="range"
            onChange={() => changeVolume(music, inputElMusic.current.value, setVolumeMusic, isMusic, setIsMusic)}
          />
        </div>
        <div className={classes.container}>
          <Typography variant="subtitle1" className={classes.subtitle}>Sound</Typography>
          <div onClick={() => toggleAudio(isSound, setIsSound, setVolumeSound, sound, 'Sound')} className={classes.icon}>
            {
              isSound
                ? <VolumeUp />
                : <VolumeOff />
            }
          </div>
          <input
            className={classes.icon}
            ref={inputElSound}
            value={volumeSound}
            min={minVolume}
            max={maxVolume}
            type="range"
            onChange={() => changeVolume(sound, inputElSound.current.value, setVolumeSound, isSound, setIsSound)}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default Statistics;
