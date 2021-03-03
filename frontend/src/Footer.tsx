import React from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    background: theme.palette.primary.dark,
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
  author: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: theme.palette.primary.contrastText,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coursesLink: {
    cursor: 'pointer',
    display: 'block',
    boxSizing: 'content-box',
  },
  logo: {
    width: '100px',
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Box className={classes.container}>
          <Box>
            <a className={classes.author} href="https://github.com/KseniyaShukevich">
              <Typography variant="subtitle1">Author: Kseniya Shukevich, 2021</Typography>
            </a>
          </Box>
          <Box>
            <a className={classes.coursesLink} href="https://rs.school/js/">
              <img className={classes.logo} src="./rs_school_js.svg" alt="courses" />
            </a>
          </Box>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
