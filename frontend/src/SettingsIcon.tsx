import React from 'react';
import { Settings } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.primary,
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

interface IProps {
  setIsSettings: (value: boolean) => void
}

const SettingsIcon: React.FC<IProps> = ({
  setIsSettings,
}: IProps) => {
  const classes = useStyles();

  const handleClick = (): void => {
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
