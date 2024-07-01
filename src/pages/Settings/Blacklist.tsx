import React, { useRef, useState } from 'react'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { makeStyles } from '@material-ui/core/styles'
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
  TextField,
  useTheme,
} from '@material-ui/core'
import { useSelector } from 'src/hooks'
import { useDispatch } from 'react-redux'
import { setSettings } from 'src/store/actions/settings'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import MainBlock from 'src/components/blocks/MainBlock'
import Sidebar from 'src/components/blocks/Sidebar'
import SideBlock from 'src/components/blocks/SideBlock'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.up(MIN_WIDTH)]: {
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
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 0,
    top: -3,
  },
}))

const List: React.FC<{
  items: string[]
  // TODO: fix types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItems: (items: string[]) => (dispatch: any) => any
}> = ({ items, setItems }) => {
  const { t } = useTranslation()
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
        <DialogTitle id="alert-dialog-title">{t`pages.SettingsBlacklist.ListDialogTitle`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t`pages.SettingsBlacklist.ListDialogContentText`}{' '}
            <b>&quot;{selectedItem}&quot;</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} color="default">
            {t`common.cancel`}
          </Button>
          <Button
            onClick={handleAlertCloseWithDeletion}
            color="primary"
            variant="contained"
            disableElevation
            autoFocus
          >
            {t`common.delete`}
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

interface AddDialogProps {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (login: string) => void
  placeholder: string
  title: string
}
const AddDialog: React.FC<AddDialogProps> = ({
  isOpen,
  setOpen,
  onSubmit,
  placeholder,
  title,
}) => {
  const textInputRef = useRef<HTMLInputElement>()
  const handleClose = () => setOpen(false)
  const { t } = useTranslation()
  const handleSubmit = () => {
    if (textInputRef.current) {
      onSubmit(textInputRef.current.value)
      setOpen(false)
    }
  }

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={handleClose}>
      <DialogTitle style={{ paddingBottom: 0 }} id="add-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <TextField
          inputRef={textInputRef}
          autoFocus
          margin="dense"
          name="title"
          label="Логин"
          placeholder={placeholder}
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default">
          {t`common.cancel`}
        </Button>
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={handleSubmit}
        >
          {t`common.add`}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const Blacklist = () => {
  const classes = useStyles()
  const theme = useTheme()
  const { t } = useTranslation()
  const [isAddAuthorDialogOpen, setAddAuthorDialogOpen] = useState(false)
  const [isAddCompanyDialogOpen, setAddCompanyDialogOpen] = useState(false)
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
  const addHiddenAuthor = (login: string) => {
    const newHiddenAuthors = [...hiddenAuthors, login]
    setHiddenAuthors(newHiddenAuthors)
  }
  const addHiddenCompany = (login: string) => {
    const newHiddenCompanies = [...hiddenCompanies, login]
    setHiddenCompanies(newHiddenCompanies)
  }
  const openAddHiddenAuthorDialog = () => {
    setAddAuthorDialogOpen(true)
  }
  const openAddHiddenCompanyDialog = () => {
    setAddCompanyDialogOpen(true)
  }
  const emptyText = (
    <Typography
      color="textSecondary"
      variant="body2"
      className={classes.emptyText}
    >
      {t`pages.SettingsBlacklist.emptyText`}
    </Typography>
  )

  return (
    <OutsidePage
      headerText={t`pages.SettingsBlacklist.pageTitle`}
      disableShrinking
      backgroundColor={theme.palette.background.paper}
    >
      <MainBlock>
        <div className={classes.section}>
          <Typography className={classes.sectionHeader}>
            {t`pages.SettingsBlacklist.hiddenAuthors`}
          </Typography>
          <IconButton
            className={classes.addButton}
            onClick={openAddHiddenAuthorDialog}
          >
            <AddRoundedIcon />
          </IconButton>
          {hiddenAuthors.length !== 0 && (
            <List items={hiddenAuthors} setItems={setHiddenAuthors} />
          )}
          {hiddenAuthors.length === 0 && emptyText}
        </div>
        <div className={classes.section}>
          <Typography className={classes.sectionHeader}>
            {t`pages.SettingsBlacklist.hiddenCompanies`}
          </Typography>
          <IconButton
            className={classes.addButton}
            onClick={openAddHiddenCompanyDialog}
          >
            <AddRoundedIcon />
          </IconButton>
          {hiddenCompanies.length !== 0 && (
            <List items={hiddenCompanies} setItems={setHiddenCompanies} />
          )}
          {hiddenCompanies.length === 0 && emptyText}
        </div>
        <AddDialog
          isOpen={isAddAuthorDialogOpen}
          setOpen={setAddAuthorDialogOpen}
          onSubmit={addHiddenAuthor}
          placeholder={t`pages.SettingsBlacklist.authorDialogPlaceholder`}
          title={t`pages.SettingsBlacklist.addAuthor`}
        />
        <AddDialog
          isOpen={isAddCompanyDialogOpen}
          setOpen={setAddCompanyDialogOpen}
          onSubmit={addHiddenCompany}
          placeholder={t`pages.SettingsBlacklist.companyDialogPlaceholder`}
          title={t`pages.SettingsBlacklist.addCompany`}
        />
      </MainBlock>
      <Sidebar>
        <SideBlock title={t`pages.SettingsBlacklist.sidebarTitle`}>
          <Typography variant="body2">
            {t`pages.SettingsBlacklist.sidebarText`}
          </Typography>
        </SideBlock>
      </Sidebar>
    </OutsidePage>
  )
}

export default React.memo(Blacklist)
