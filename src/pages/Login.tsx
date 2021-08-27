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
  useTheme,
} from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDispatch } from 'react-redux'
import { getAccountAuthData, getCSRFToken } from 'src/store/actions/auth'
import { FetchingState } from 'src/interfaces'
import { useHistory } from 'react-router-dom'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { useSnackbar } from 'notistack'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { useSelector } from 'src/hooks'
import { MIN_WIDTH } from 'src/config/constants'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    margin: '0 auto',
    maxWidth: 460,
    width: '100%',
    background: theme.palette.background.paper,
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderRadius: 8,
    },
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
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const authData = useSelector((store) => store.auth.authData.data)
  const authDataFetchingState = useSelector(
    (store) => store.auth.authData.state
  )
  const authDataFetchError = useSelector(
    (store) => store.auth.authData.fetchError
  )
  const csrfTokenFetchingState = useSelector(
    (store) => store.auth.csrfToken.state
  )
  const csrfTokenFetchError = useSelector(
    (store) => store.auth.csrfToken.fetchError
  )
  const csrfToken = useSelector((store) => store.auth.csrfToken.data)
  const shouldDisableLoginButton =
    authDataFetchingState === FetchingState.Fetching ||
    csrfTokenFetchingState === FetchingState.Fetching
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    // Get auth data with user's email and password
    dispatch(getAccountAuthData({ email, password }))
  }

  useEffect(() => {
    if (authData && !csrfToken) {
      dispatch(getCSRFToken(authData))
    } else if (authData && csrfToken) {
      enqueueSnackbar('Вход успешен!', {
        variant: 'success',
        autoHideDuration: 3000,
      })
      history.push('/')
    } else if (authDataFetchingState === FetchingState.Error) {
      if (authDataFetchError.isAuthError) {
        enqueueSnackbar('Неверная почта или пароль', {
          variant: 'error',
          autoHideDuration: 4000,
        })
      } else if (authDataFetchError.isCaptchaError) {
        enqueueSnackbar('Введите капчу', {
          variant: 'error',
          autoHideDuration: 4000,
        })
      } else if (authDataFetchError.isUnknownAuthError) {
        enqueueSnackbar(authDataFetchError.message, {
          variant: 'error',
          autoHideDuration: 4000,
        })
      }
    } else if (csrfTokenFetchingState === FetchingState.Error) {
      enqueueSnackbar('Не удалось получить CSRF токен', {
        variant: 'error',
        autoHideDuration: 4000,
      })
    }
  }, [authData, csrfToken, history, authDataFetchingState])

  return (
    <OutsidePage
      backgroundColor={theme.palette.background.paper}
      headerText={'Авторизация'}
      disableShrinking
    >
      <form className={classes.root} onSubmit={handleLoginSubmit}>
        <div className={classes.paper}>
          <Grid container direction="column" className={classes.grid}>
            <Grid item>
              <Typography className={classes.headerTitle}>Вход</Typography>
            </Grid>
            <Grid item className={classes.input}>
              <Typography className={classes.inputLabel}>
                Электропочта
              </Typography>
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
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
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
                disabled={shouldDisableLoginButton}
              >
                Войти
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </OutsidePage>
  )
}

export default React.memo(Login)
