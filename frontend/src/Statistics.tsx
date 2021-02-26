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
  heightZero: {
    overflow: 'hidden',
    height: 0,
    transition: '1s',
  },
  height: {
    height: '100px',
    transition: '1s',
  },
  table: {
    minWidth: 330,
  },
}));

interface IProps {
  isEndGame: boolean
  statistics: Array<IStatistics>
  isStatistics: boolean
  setIsStatistics: (value: boolean) => void
  startTime: () => void
}

const Statistics: React.FC<IProps> = ({
  isEndGame,
  statistics,
  isStatistics,
  setIsStatistics,
  startTime,
}: IProps) => {
  const classes = useStyles();

  const onClose = () => {
    setIsStatistics(false);
    if (!isEndGame) startTime();
  };

  return (
    <Dialog open={isStatistics} onClose={onClose}>
      <div className={classes.containerTable}>
        <Typography variant="h5" className={classes.heading}>Statistics</Typography>
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
                  <TableCell align="center">{row.countSeconds}</TableCell>
                  <TableCell align="center">{row.errors}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Dialog>
  );
};

export default Statistics;
