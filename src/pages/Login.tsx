import React, { useEffect, useState } from 'react'
import {
  Button,
  Typography,
  Grid,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDispatch } from 'react-redux'
import { setToken } from 'src/store/actions/user'
import { FetchingState } from 'src/interfaces'
import { useHistory } from 'react-router-dom'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { useSnackbar } from 'notistack'
import { getToken } from 'habra-auth'

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
  const { enqueueSnackbar } = useSnackbar()
  const [showPassword, setShowPassword] = useState(false)
  const [state, setFetchingState] = useState(FetchingState.Idle)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      // Set fetching state as fetching for displaying loading spinner
      setFetchingState(FetchingState.Fetching)

      // Get login data with user's email and password
      const data = await getToken(email, password)

      dispatch(setToken(data.access_token))
      setFetchingState(FetchingState.Fetched)
    } catch (e) {
      setFetchingState(FetchingState.Error)
    }
  }

  useEffect(() => {
    if (state === FetchingState.Fetched) {
      enqueueSnackbar('Вход успешен!', {
        variant: 'success',
        autoHideDuration: 3000,
      })
      history.push('/')
    } else if (state === FetchingState.Error) {
      enqueueSnackbar('Неверная почта или пароль', {
        variant: 'error',
        autoHideDuration: 4000,
      })
    }
  }, [state, history, enqueueSnackbar])

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
              autoComplete="email"
              name="email"
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item className={classes.input}>
            <Typography className={classes.inputLabel}>Пароль</Typography>
            <OutlinedInput
              autoComplete="current-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="dense"
              endAdornment={
                <InputAdornment position="end" style={{ marginRight: -8 }}>
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? (
                      <VisibilityIcon color="disabled" />
                    ) : (
                      <VisibilityOffIcon color="disabled" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
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
