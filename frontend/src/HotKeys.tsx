import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Dialog,
} from '@material-ui/core';
import {
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
  KeyboardReturn,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: 230,
    padding: theme.spacing(2),
  },
  containerItem: {
    display: 'flex',
    paddingBottom: theme.spacing(0.7),
  },
  text: {
    paddingLeft: theme.spacing(2),
  },
  heading: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: theme.palette.primary.dark,
    paddingBottom: theme.spacing(2),
  },
  icon: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

interface IProps {
  isHotKeys: boolean
  setIsHotKeys: (value: boolean) => void
}

const HotKeys: React.FC<IProps> = ({ isHotKeys, setIsHotKeys }: IProps) => {
  const classes = useStyles();

  const onClose = () => {
    setIsHotKeys(false);
  };
  return (
    <Dialog open={isHotKeys} onClose={onClose}>
      <div className={classes.container}>
        <Typography variant="h5" className={classes.heading}>hotkeys</Typography>
        <div className={classes.containerItem}>
          <KeyboardArrowDown className={classes.icon} />
          <Typography className={classes.text} variant="subtitle1">- down</Typography>
        </div>
        <div className={classes.containerItem}>
          <KeyboardArrowLeft className={classes.icon} />
          <Typography className={classes.text} variant="subtitle1">- left</Typography>
        </div>
        <div className={classes.containerItem}>
          <KeyboardArrowRight className={classes.icon} />
          <Typography className={classes.text} variant="subtitle1">- right</Typography>
        </div>
        <div className={classes.containerItem}>
          <KeyboardArrowUp className={classes.icon} />
          <Typography className={classes.text} variant="subtitle1">- up</Typography>
        </div>
        <div className={classes.containerItem}>
          <KeyboardReturn className={classes.icon} />
          <Typography className={classes.text} variant="subtitle1">(Enter) - choose a card</Typography>
        </div>
      </div>
    </Dialog>
  );
};

export default HotKeys;
