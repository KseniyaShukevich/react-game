import React from 'react';
import { EqualizerTwoTone } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import idLocalStorage from './idLocalStorage';
import IStatistics from './IStatistics';

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

const getRating = (value: Array<IStatistics>) => {
  value.forEach((item, index) => {
    item.id = index + 1;
  });
};

const getStatistics = (): Array<IStatistics> | null => {
  const savedStatistics = localStorage.getItem(`${idLocalStorage}statistics`);
  if (savedStatistics) {
    const arrayStatistics: Array<IStatistics> = JSON.parse(savedStatistics);
    getRating(arrayStatistics);
    return arrayStatistics;
  }
  return null;
};

const StatisticsIcon: React.FC<IProps> = ({
  setStatistics,
  setIsStatistics,
  clearSetInterval,
}: IProps) => {
  const classes = useStyles();

  const handleClick = (): void => {
    clearSetInterval();
    setIsStatistics(true);
    setStatistics(getStatistics());
  };

  return (
    <EqualizerTwoTone
      className={classes.icon}
      onClick={handleClick}
    />
  );
};

export default StatisticsIcon;
