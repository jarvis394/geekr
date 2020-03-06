import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import {
  Switch,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router'
import { get } from 'request-promise-native'
import Link from 'react-router-dom/Link'
import PostViewSkeleton from '../components/skeletons/PostView'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: { width: '100%', height: '100%', maxWidth: '100vw' },
  title: {
    fontFamily: 'Google Sans',
    fontWeight: 500,
    marginTop: theme.spacing(2),
  },
  subheader: {
    marginTop: theme.spacing(1),
  },
}))

const Settings = ({ state, setState }) => {
  const { theme } = state
  const classes = useStyles()

  const setTheme = () => {
    const newThemeType = theme.palette.type === 'light' ? 'dark' : 'light'
    const newTheme = {
      palette: {
        type: newThemeType,
        ...state.theme.palette
      },
      ...state.theme
    }
    setState(prev => ({ ...prev, theme: newTheme}))
    localStorage.setItem('theme', newThemeType)
  }

  return (
    <div>
      <Container>
        <Typography className={classes.title} variant="h4">
          Настройки
        </Typography>
      </Container>

      <List
        subheader={<ListSubheader>Основные</ListSubheader>}
        className={classes.subheader}
      >
        <ListItem button onClick={setTheme}>
          <ListItemText
            secondary={theme.palette.type}
            primary="Тема"
          />
          <Switch checked={theme.palette.type === 'dark'} color="primary" />
        </ListItem>
        <Divider />
      </List>
    </div>
  )
}

export default Settings
