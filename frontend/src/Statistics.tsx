import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Dialog,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core';
import IStatistics from './IStatistics';
import timeObj from './timeObj';
import statisticsObj from './statisticsObj';

const useStyles = makeStyles((theme) => ({
  containerTable: {
    padding: theme.spacing(2),
  },
  heading: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: theme.palette.primary.dark,
    paddingBottom: theme.spacing(2),
  },
  select: {
    width: '100%',
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  noStatistics: {
    paddingTop: theme.spacing(2),
    textAlign: 'center',
    color: 'grey',
    minWidth: 300,
  },
  table: {
    minWidth: 300,
  },
}));

interface IProps {
  level: number
  setStatistics: (value: Array<IStatistics>) => void
  statistics: Array<IStatistics>
  isStatistics: boolean
  setIsStatistics: (value: boolean) => void
}

const Statistics: React.FC<IProps> = ({
  level,
  setStatistics,
  statistics,
  isStatistics,
  setIsStatistics,
}: IProps) => {
  const classes = useStyles();
  const optionLevel0 = useRef(null);
  const optionLevel1 = useRef(null);
  const optionLevel2 = useRef(null);
  const options: Array<any> = [optionLevel0, optionLevel1, optionLevel2];

  const onClose = () => {
    setIsStatistics(false);
  };

  const changeLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatistics(statisticsObj.get(+e.target.value));
  };

  useEffect(() => {
    setTimeout(() => {
      if (options[level].current) {
        options[level].current.selected = true;
      }
    }, 100);
  }, [isStatistics]);

  return (
    <Dialog open={isStatistics} onClose={onClose}>
      <div className={classes.containerTable}>
        <Typography variant="h5" className={classes.heading}>statistics</Typography>
        <select className={classes.select} onChange={changeLevel}>
          <option ref={optionLevel0} value={0}>light</option>
          <option ref={optionLevel1} value={1}>normal</option>
          <option ref={optionLevel2} value={2}>hard</option>
        </select>
        {
          statistics ? (
            <>
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">№</TableCell>
                      <TableCell align="center">Score</TableCell>
                      <TableCell align="center">Time</TableCell>
                      <TableCell align="center">Errors</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {statistics?.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="center">{row.score}</TableCell>
                        <TableCell align="center">
                          {timeObj.getMinutes(row.countSeconds)}
                          :
                          {timeObj.getSeconds(row.countSeconds)}
                        </TableCell>
                        <TableCell align="center">{row.errors}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Typography variant="subtitle1" className={classes.noStatistics}>no statistics</Typography>
          )
        }
      </div>
    </Dialog>
  );
};

export default Statistics;
