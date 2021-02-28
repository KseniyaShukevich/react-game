import React from 'react';
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
  headingNoStatistics: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: theme.palette.primary.dark,
  },
  table: {
    minWidth: 330,
  },
}));

interface IProps {
  isAutoplay: boolean
  isEndGame: boolean
  statistics: Array<IStatistics>
  isStatistics: boolean
  setIsStatistics: (value: boolean) => void
  startTime: () => void
}

const Statistics: React.FC<IProps> = ({
  isAutoplay,
  isEndGame,
  statistics,
  isStatistics,
  setIsStatistics,
  startTime,
}: IProps) => {
  const classes = useStyles();

  const onClose = () => {
    setIsStatistics(false);
    if (!isEndGame && !isAutoplay) startTime();
  };

  return (
    <Dialog open={isStatistics} onClose={onClose}>
      <div className={classes.containerTable}>
        {
          statistics ? (
            <Typography variant="h5" className={classes.heading}>statistics</Typography>
          ) : (
            <Typography variant="h5" className={classes.headingNoStatistics}>no statistics</Typography>
          )
        }
        {
          statistics ? (
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
          ) : ''
        }
      </div>
    </Dialog>
  );
};

export default Statistics;
