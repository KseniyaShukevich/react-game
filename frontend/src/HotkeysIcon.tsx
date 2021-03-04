import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Keyboard } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.primary,
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

interface IProps {
  setIsHotKeys: (value: boolean) => void
}

const HotKeysIcon: React.FC<IProps> = ({ setIsHotKeys }: IProps) => {
  const classes = useStyles();

  const handleClick = (): void => {
    setIsHotKeys(true);
  };

  return (
    <Keyboard
      className={classes.icon}
      onClick={handleClick}
    />
  );
};

export default HotKeysIcon;
