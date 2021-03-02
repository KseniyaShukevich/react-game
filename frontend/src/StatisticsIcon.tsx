import React from 'react';
import { Equalizer } from '@material-ui/icons';
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
}

const StatisticsIcon: React.FC<IProps> = ({
  setStatistics,
  setIsStatistics,
}: IProps) => {
  const classes = useStyles();

  const handleClick = (): void => {
    setIsStatistics(true);
    setStatistics(statisticsObj.get());
  };

  return (
    <Equalizer
      className={classes.icon}
      onClick={handleClick}
    />
  );
};

export default StatisticsIcon;
