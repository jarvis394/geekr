import React from 'react'
import { getToken } from 'habra-auth'
import { Button, Typography, Grid, Paper, TextField } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    margin: '0 auto',
    maxWidth: 460,
    width: '100%',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  },
  grid: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2.5),
  },
  headerTitle: {
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 28,
  },
  input: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  inputLabel: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    fontSize: 16,
  },
  loginButton: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.25, 2),
  },
}))

const Login = () => {
  const classes = useStyles()

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    getToken(email, password)
      .then((e) => {
        console.log(e)
      })
      .catch((e) => console.warn(e))
  }

  return (
    <form className={classes.root} onSubmit={handleLoginSubmit}>
      <Paper className={classes.paper}>
        <Grid container direction="column" className={classes.grid}>
          <Grid item>
            <Typography className={classes.headerTitle}>Вход</Typography>
          </Grid>
          <Grid item className={classes.input}>
            <Typography className={classes.inputLabel}>Электропочта</Typography>
            <TextField
              autoFocus
              name="email"
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item className={classes.input}>
            <Typography className={classes.inputLabel}>Пароль</Typography>
            <TextField
              size="small"
              name="password"
              type="password"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Button
              disableElevation
              className={classes.loginButton}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Войти
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  )
}

export default React.memo(Login)
