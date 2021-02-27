import React from 'react';
import { Settings } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  icon: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

interface IProps {
  setIsSettings: (value: boolean) => void
  clearSetInterval: () => void
}

const SettingsIcon: React.FC<IProps> = ({
  setIsSettings,
  clearSetInterval,
}: IProps) => {
  const classes = useStyles();

  const handleClick = (): void => {
    clearSetInterval();
    setIsSettings(true);
  };

  return (
    <Settings
      className={classes.icon}
      onClick={handleClick}
    />
  );
};

export default SettingsIcon;
