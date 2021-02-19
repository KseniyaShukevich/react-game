import React from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  footer: {
    background: '#4791db',
  },
  author: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: 'white',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '17px',
  },
  coursesLink: {
    cursor: 'pointer',
    display: 'block',
    boxSizing: 'content-box',
  },
  logo: {
    width: '100px',
  }
}))

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Box className={classes.container}>
          <Box>
            <a className={classes.author} href="https://github.com/KseniyaShukevich">
              <Typography variant="subtitle1">Author: Kseniya Shukevich</Typography>
            </a>
          </Box>
          <Box>
            <a className={classes.coursesLink} href="https://rs.school/js/">
              <img className={classes.logo} src="./rs_school_js.svg" alt="courses"/>
            </a>
          </Box>
        </Box>
      </Container>
    </footer>
  );
}

export default Footer;