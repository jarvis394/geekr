import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import {
  Switch,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { makeBackgroundColors } from '../config/theme'

const useStyles = makeStyles(theme => ({
  root: { width: '100%', height: '100%', maxWidth: '100vw' },
}))

const Search = ({ state, setState }) => {
  const { theme } = state
  const classes = useStyles()

  return (
    <div style={{ width: '100%' }}>
    </div>
  )
}

export default Search
