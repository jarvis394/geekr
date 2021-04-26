import React, { useState } from 'react'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { fade, makeStyles } from '@material-ui/core/styles'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { MIN_WIDTH } from 'src/config/constants'
import {
  Typography,
  List as MUIList,
  ListItem,
  IconButton,
  ListItemText,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { useSelector } from 'src/hooks'
import { useDispatch } from 'react-redux'
import { setSettings } from 'src/store/actions/settings'
import AddRoundedIcon from '@material-ui/icons/AddRounded'

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      border: '1px solid ' + fade(theme.palette.divider, 0.05),
      borderRadius: 8,
    },
    position: 'relative',
    overflow: 'hidden',
  },
  sectionHeader: {
    fontSize: 13,
    color: theme.palette.text.hint,
    textTransform: 'uppercase',
    fontWeight: 500,
    lineHeight: 'normal',
    fontFamily: 'Google Sans',
    paddingBottom: 0,
    padding: theme.spacing(1.8, 2),
  },
  emptyText: {
    padding: theme.spacing(2.5, 0),
    textAlign: 'center'
  },
  addButton: {
    position: 'absolute',
    right: 0,
    top: -3
  }
}))

const List = ({ items, setItems }) => {
  const classes = useStyles()
  const [selectedItem, setSelectedItem] = useState<string>()
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false)
  const handleAlertClose = () => setAlertDialogOpen(false)
  const handleAlertCloseWithDeletion = () => {
    const selectedItemIndex = items.findIndex((e) => e === selectedItem)
    items.splice(selectedItemIndex, 1)
    setItems(items)
    handleAlertClose()
  }
  const openAlertDialog = (item: string) => {
    setSelectedItem(item)
    setAlertDialogOpen(true)
  }

  return (
    <MUIList>
      <Dialog open={isAlertDialogOpen} onClose={handleAlertClose}>
        <DialogTitle id="alert-dialog-title">Подтверждение</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Точно хочешь удалить из списка <b>&quot;{selectedItem}&quot;</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} color="default">
            Отмена
          </Button>
          <Button
            onClick={handleAlertCloseWithDeletion}
            color="primary"
            variant="contained"
            disableElevation
            autoFocus
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
      {items.map((e, i) => (
        <ListItem key={i} dense>
          <ListItemText>{e}</ListItemText>
          <IconButton onClick={() => openAlertDialog(e)}>
            <CloseRoundedIcon />
          </IconButton>
        </ListItem>
      ))}
    </MUIList>
  )
}

const AddDialog = () => {
  const [isOpen, setOpen] = useState(false)
}

const Blacklist = () => {
  const classes = useStyles()
  const hiddenAuthors = useSelector((store) => store.settings.hiddenAuthors)
  const hiddenCompanies = useSelector((store) => store.settings.hiddenCompanies)
  const dispatch = useDispatch()
  const setHiddenAuthors = (items: string[]) =>
    dispatch(
      setSettings({
        hiddenAuthors: items,
      })
    )
  const setHiddenCompanies = (items: string[]) =>
    dispatch(
      setSettings({
        hiddenCompanies: items,
      })
    )
  const addHiddenAuthor = () => {
    //
  }
  const addHiddenCompany = () => {
    //
  }
  const emptyText = (
    <Typography color="textSecondary" variant="body2" className={classes.emptyText}>
      В чёрном списке пока нет элементов.
    </Typography>
  )

  return (
    <OutsidePage headerText={'Чёрный список'} disableShrinking>
      <div className={classes.section}>
        <Typography className={classes.sectionHeader}>
          Скрытые авторы
        </Typography>
        <IconButton className={classes.addButton} onClick={addHiddenAuthor}>
          <AddRoundedIcon />
        </IconButton>
        {hiddenAuthors.length !== 0 && (
          <List items={hiddenAuthors} setItems={setHiddenAuthors} />
        )}
        {hiddenAuthors.length === 0 && emptyText}
      </div>
      <div className={classes.section}>
        <Typography className={classes.sectionHeader}>
          Скрытые компании
        </Typography>
        <IconButton className={classes.addButton} onClick={addHiddenCompany}>
          <AddRoundedIcon />
        </IconButton>
        {hiddenCompanies.length !== 0 && (
          <List items={hiddenCompanies} setItems={setHiddenCompanies} />
        )}
        {hiddenCompanies.length === 0 && emptyText}
      </div>
    </OutsidePage>
  )
}

export default React.memo(Blacklist)
