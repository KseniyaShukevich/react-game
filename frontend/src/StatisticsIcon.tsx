import React from 'react';
import { EqualizerTwoTone } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import IStatistics from './IStatistics';
import statisticsObj from './statisticsObj';

const useStyles = makeStyles(() => ({
  icon: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

interface IProps {
  setStatistics: (value: Array<IStatistics> | null) => void
  setIsStatistics: (value: boolean) => void
  clearSetInterval: () => void
}

const StatisticsIcon: React.FC<IProps> = ({
  setStatistics,
  setIsStatistics,
  clearSetInterval,
}: IProps) => {
  const classes = useStyles();

  const handleClick = (): void => {
    clearSetInterval();
    setIsStatistics(true);
    setStatistics(statisticsObj.get());
  };

  return (
    <EqualizerTwoTone
      className={classes.icon}
      onClick={handleClick}
    />
  );
};

export default StatisticsIcon;
