import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Dialog,
} from '@material-ui/core';
import {
  MusicNote, MusicOff, VolumeUp, VolumeOff,
} from '@material-ui/icons';
import audioObj from './audioObj';
import levelObj from './levelObj';
import fieldObj from './fieldObj';
import themeObj from './themeObj';

const useStyles = makeStyles((theme) => ({
  containerSettings: {
    padding: theme.spacing(2),
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(1),
  },
  select: {
    width: 135,
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  input: {
    background: theme.palette.background.default,
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
  isSettings: boolean
  setIsSettings: (value: boolean) => void
  setIsMusic: (value: any) => void
  setIsSound: (value: any) => void
  setTheme: (value: any) => void
  setThemeNumber: (value: number) => void
}

const Statistics: React.FC<IProps> = ({
  isMusic,
  isSound,
  music,
  sound,
  inputElMusic,
  inputElSound,
  isSettings,
  setIsSettings,
  setIsMusic,
  setIsSound,
  setTheme,
  setThemeNumber,
}: IProps) => {
  const minVolume: number = 0;
  const maxVolume: number = 100;
  const classes = useStyles();
  const [volumeMusic, setVolumeMusic] = useState<number>(audioObj.get('Music') * maxVolume);
  const [volumeSound, setVolumeSound] = useState<number>(audioObj.get('Sound') * maxVolume);
  const optionLevel0 = useRef(null);
  const optionLevel1 = useRef(null);
  const optionLevel2 = useRef(null);
  const options: Array<any> = [optionLevel0, optionLevel1, optionLevel2];
  const optionPC = useRef(null);
  const optionMobile = useRef(null);
  const optionsField: Array<any> = [optionPC, optionMobile];
  const optionLightTheme = useRef(null);
  const optionDarkTheme = useRef(null);
  const optionsThemes: Array<any> = [optionLightTheme, optionDarkTheme];

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
    setIsFunc((prev: any) => !prev);
  };

  const changeVolume = (
    refEl: any, inputValue: number, setVolumeFunc: any, isAudio: boolean, setIsFunc: any,
  ): void => {
    refEl.current.volume = inputValue / maxVolume;
    setVolumeFunc(inputValue);
  };

  useEffect(() => {
    if (isSound && (+volumeSound === 0)) setIsSound(false);
    if (!isSound && (+volumeSound > 0)) setIsSound(true);
  }, [volumeSound]);

  useEffect(() => {
    if (isMusic && (+volumeMusic === 0)) setIsMusic(false);
    if (!isMusic && (+volumeMusic > 0)) setIsMusic(true);
  }, [volumeMusic]);

  const onClose = (): void => {
    setIsSettings(false);
    saveAudio(isMusic, music.current.volume, 'Music');
    saveAudio(isSound, sound.current.volume, 'Sound');
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

  const changeLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    levelObj.save(e.target.value);
  };

  const chooseField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fieldObj.save(e.target.value);
  };

  const chooseTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
    themeObj.save(e.target.value);
    setTheme(themeObj.getTheme());
    setThemeNumber(themeObj.get());
  };

  useEffect(() => {
    setTimeout(() => {
      if (isSettings && options[0].current) {
        const optionIndexLevel: number = levelObj.get();
        options[optionIndexLevel].current.selected = true;
        const optionIndexField: number = fieldObj.get();
        optionsField[optionIndexField].current.selected = true;
        const optionTheme: number = themeObj.get();
        optionsThemes[optionTheme].current.selected = true;
      }
    }, 100);
  }, [isSettings]);

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
        <div className={classes.container}>
        <Typography variant="subtitle1" className={classes.subtitle}>Level</Typography>
          <select className={classes.select} onChange={changeLevel}>
            <option ref={optionLevel0} value={0}>light</option>
            <option ref={optionLevel1} value={1}>normal</option>
            <option ref={optionLevel2} value={2}>hard</option>
          </select>
        </div>
        <div className={classes.container}>
        <Typography variant="subtitle1" className={classes.subtitle}>Field</Typography>
          <select className={classes.select} onChange={chooseField}>
            <option ref={optionPC} value={0}>PC</option>
            <option ref={optionMobile} value={1}>mobile</option>
          </select>
        </div>
        <div className={classes.container}>
        <Typography variant="subtitle1" className={classes.subtitle}>Theme</Typography>
          <select className={classes.select} onChange={chooseTheme}>
            <option ref={optionLightTheme} value={0}>Light</option>
            <option ref={optionDarkTheme} value={1}>Dark</option>
          </select>
        </div>
      </div>
    </Dialog>
  );
};

export default Statistics;
