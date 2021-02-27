import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Dialog,
} from '@material-ui/core';
import {
  MusicNote, MusicOff, VolumeUp, VolumeOff,
} from '@material-ui/icons';

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
  const [volumeMusic, setVolumeMusic] = useState<number>(maxVolume);
  const [volumeSound, setVolumeSound] = useState<number>(maxVolume);

  const toggleSound = (): void => {
    if (isSound) {
      setVolumeSound(minVolume);
    } else {
      setVolumeSound(maxVolume);
    }
    setIsSound(!isSound);
  };

  const toggleMusic = (): void => {
    if (isMusic) {
      setVolumeMusic(minVolume);
      music.current.volume = minVolume;
    } else {
      setVolumeMusic(maxVolume);
      music.current.volume = 1;
    }
    setIsMusic(!isMusic);
  };

  const changeVolumeMusic = (): void => {
    music.current.volume = inputElMusic.current.value / maxVolume;
    setVolumeMusic(inputElMusic.current.value);
  };

  const changeVolumeSound = (): void => {
    sound.current.volume = inputElSound.current.value / maxVolume;
    setVolumeSound(inputElSound.current.value);
  };

  const onClose = (): void => {
    setIsSettings(false);
    if (!isEndGame) startTime();
  };

  return (
    <Dialog open={isSettings} onClose={onClose}>
      <div className={classes.containerSettings}>
        <Typography variant="h5" className={classes.heading}>settings</Typography>
        <div className={classes.container}>
          <Typography variant="subtitle1" className={classes.subtitle}>Music</Typography>
          <div onClick={toggleMusic} className={classes.icon}>
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
            onChange={changeVolumeMusic}
          />
        </div>
        <div className={classes.container}>
          <Typography variant="subtitle1" className={classes.subtitle}>Sound</Typography>
          <div onClick={toggleSound} className={classes.icon}>
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
            onChange={changeVolumeSound}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default Statistics;
