import React from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import ExpandIcon from '@material-ui/icons/ArrowDropDown'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import { MODES as modes } from '../../config/constants'

const useStyles = makeStyles(theme => ({
  expansionPanel: {
    margin: '0 !important',
    borderBottom: '1px solid ' + fade(theme.palette.divider, 0.05),
    '&::before': { display: 'none' }
  },
  expansionPanelSummary: {
    padding: 0,
    minHeight: '48px !important',
    height: '48px !important',
  },
  expansionPanelDetails: {
    padding: 0,
    background: fade(theme.palette.background.default, 0.4),
  },
  text: {
    fontSize: 14,
    fontWeight: 500,
  },
  item: {
    width: '100%',
  },
  textSelected: {
    fontSize: 14,
    color: theme.palette.primary.main,
    fontWeight: 800,
  },
}))

const Switcher = ({ handleClick, mode, setMode }) => {
  const [isExpanded, setExpanded] = React.useState(false)
  const ListButton = ({ data }) => {
    const isNotCurrent = data.mode !== current.mode
    const handleClickWrapped = () => {
      if (isNotCurrent) {
        setExpanded(false)
        setMode(data.mode)
        handleClick(data)
      }
    }

    return (
      <ListItem
        onClick={handleClickWrapped}
        button={isNotCurrent as true | undefined}
        className={classes.item}
      >
        <ListItemText
          primaryTypographyProps={{
            className: isNotCurrent ? classes.text : classes.textSelected,
          }}
        >
          {data.text}
        </ListItemText>
      </ListItem>
    )
  }
  const ListButtonMemoized = React.memo(ListButton)

  const classes = useStyles()
  const current = modes.find(e => e.mode === mode)
  const buttonList = modes.map((e, i) => <ListButtonMemoized data={e} key={i} />)
  
  return (
    <>
      <ExpansionPanel
        elevation={0}
        expanded={isExpanded}
        onChange={() => setExpanded(prev => !prev)}
        className={classes.expansionPanel}
        TransitionProps={{ unmountOnExit: true }}
      >
        <Container>
          <ExpansionPanelSummary
            className={classes.expansionPanelSummary}
            expandIcon={<ExpandIcon />}
          >
            <Typography className={classes.text}>{current.text}</Typography>
            <Divider />
          </ExpansionPanelSummary>
        </Container>
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          <List style={{ width: '100%', paddingTop: 0 }}>{buttonList}</List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  )
}

export default React.memo(Switcher)
