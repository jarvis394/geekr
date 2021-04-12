import React, { useState } from 'react'
import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  fade,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import OutsidePage from 'src/components/blocks/OutsidePage'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'
import { Alert } from '@material-ui/lab'
import { MIN_WIDTH } from 'src/config/constants'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import {
  CustomPicker,
  Color,
  ColorResult,
  HSLColor,
  RGBColor,
} from 'react-color'
import {
  EditableInput,
  Saturation,
  Checkboard,
  Hue,
} from 'react-color/lib/components/common'

interface PaletteGridItem {
  text: string
  color: string
}

interface PaletteItem {
  title: string
  items: PaletteGridItem[]
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: getContrastPaperColor(theme),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      border: '1px solid ' + fade(theme.palette.divider, 0.05),
      marginTop: theme.spacing(1.5),
      borderRadius: 8,
      backgroundColor: theme.palette.background.paper,
    },
  },
  padding: {
    padding: theme.spacing(1.8, 2),
  },
  infoAlert: {
    backgroundColor: 'rgb(0 107 204 / 7%)',
  },
  themeNameInput: {
    marginTop: theme.spacing(3),
  },
}))

const usePaletteGridItemStyles = makeStyles((theme) => ({
  gridItem: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'start',
    borderRadius: 4,
    transition: 'all 250ms 0ms cubic-bezier(0.25, 1, 0.25, 1)',
  },
  box: {
    width: 48,
    height: 48,
    flexShrink: 0,
    marginRight: theme.spacing(1),
    borderRadius: 4,
  },
  gridItemTitle: {
    marginTop: theme.spacing(3),
  },
  textHolder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    flexGrow: 1,
  },
  iconHolder: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
  },
  icon: {
    transform: 'scale(0.5)',
    opacity: 0,
    transition: 'all 250ms 0ms cubic-bezier(0.25, 1, 0.25, 1)',
  },
  checked: {
    transform: 'scale(1)',
    opacity: 1,
  },
  checkedBackground: {
    background: fade(theme.palette.text.primary, 0.05),
  },
}))

const useColorPickerStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: getContrastPaperColor(theme),
    position: 'relative',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      border: '1px solid ' + fade(theme.palette.divider, 0.05),
      marginTop: theme.spacing(1.5),
      borderRadius: 8,
      backgroundColor: theme.palette.background.paper,
    },
  },
  header: {
    fontSize: 13,
    color: theme.palette.text.hint,
    textTransform: 'uppercase',
    fontWeight: 500,
    lineHeight: 'normal',
    fontFamily: 'Google Sans',
    marginBottom: theme.spacing(1.5),
    paddingBottom: 0,
    padding: theme.spacing(1.5, 2),
  },
}))

const PaletteGridItem = ({
  title,
  items,
  setSelected,
  selectedItem,
}: {
  title: string
  items: PaletteItem['items']
  setSelected: React.Dispatch<React.SetStateAction<string>>
  selectedItem: string
}) => {
  const theme = useTheme()
  const classes = usePaletteGridItemStyles()
  const handleClick = (text: string) => {
    if (selectedItem !== text) {
      setSelected(text)
    }
  }

  return (
    <>
      <Typography gutterBottom className={classes.gridItemTitle}>
        {title}
      </Typography>
      <Grid container spacing={1}>
        {items.map((e, i) => (
          <Grid
            key={i}
            item
            xs={12}
            sm={6}
            md={4}
            className={[
              classes.gridItem,
              selectedItem === e.text ? classes.checkedBackground : null,
            ].join(' ')}
            component={ButtonBase}
            onClick={() => handleClick(e.text)}
          >
            <div
              className={classes.box}
              style={{
                backgroundColor: e.color,
                border:
                  theme.palette.background.paper === e.color ||
                  theme.palette.background.default === e.color
                    ? '1px solid ' + theme.palette.divider
                    : null,
              }}
            />
            <div className={classes.textHolder}>
              <Typography variant="body2">{e.text}</Typography>
              <Typography variant="body2" color="textSecondary">
                {e.color}
              </Typography>
            </div>
            <div className={classes.iconHolder}>
              <RadioButtonCheckedIcon
                color="primary"
                className={[
                  classes.icon,
                  selectedItem === e.text ? classes.checked : null,
                ].join(' ')}
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

interface InjectedColorProps {
  hex: string
  hsl: HSLColor
  rgb: RGBColor
  onChange: (color: Color | ColorResult) => void
}

const ColorPicker = CustomPicker(({ ...props }) => {
  const classes = useColorPickerStyles()
  const HuePointer = () => (
    <div style={{
      width: 18,
      height: 18,
      borderRadius: '50%',
      transform: 'translate(-9px, -1px)',
      backgroundColor: 'rgb(248, 248, 248)',
      boxShadow: 'rgba(0, 0, 0, 0.37) 0px 1px 4px 0px'
    }} />
  )

  return (
    <div className={classes.root}>
      <Typography className={classes.header}>Палитра</Typography>
      <EditableInput />
      <div style={{ position: 'relative', height: 16 }}>
        <Hue {...(props as InjectedColorProps)} pointer={HuePointer} />
      </div>
      <div style={{ position: 'relative',height: 128 }}>
        <Saturation {...(props as InjectedColorProps)} />
      </div>
    </div>
  )
})

const NewTheme = () => {
  const classes = useStyles()
  const defaultTheme = useTheme()
  const [isTitleEditDialogOpen, setTitleEditDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('primary.light')
  const [currentTheme, setCurrentTheme] = useState(defaultTheme)
  const paletteItems: PaletteItem[] = [
    {
      title: 'Акцент',
      items: [
        {
          text: 'primary.light',
          color: currentTheme.palette.primary.light,
        },
        {
          text: 'primary.main',
          color: currentTheme.palette.primary.main,
        },
        {
          text: 'primary.dark',
          color: currentTheme.palette.primary.dark,
        },
      ],
    },
    {
      title: 'Поверхности',
      items: [
        {
          text: 'background.paper',
          color: currentTheme.palette.background.paper,
        },
        {
          text: 'background.default',
          color: currentTheme.palette.background.default,
        },
      ],
    },
    {
      title: 'Текст',
      items: [
        {
          text: 'text.primary',
          color: currentTheme.palette.text.primary,
        },
      ],
    },
  ]

  const handleTitleEditClick = () => {
    setTitleEditDialogOpen(true)
  }
  const handleTitleEditDialogClose = () => {
    setTitleEditDialogOpen(false)
  }

  const toolbarIcons = (
    <>
      <IconButton onClick={handleTitleEditClick}>
        <EditRoundedIcon />
      </IconButton>
      <Dialog open={isTitleEditDialogOpen} onClose={handleTitleEditDialogClose}>
        <DialogTitle>Название темы</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Название новой темы должно быть уникально, оно будет отображаться в
            настройках рядом с темами по умолчанию. Это название можно будет
            поменять.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Название темы"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTitleEditDialogClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleTitleEditDialogClose} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )

  return (
    <OutsidePage
      hidePositionBar
      disableShrinking
      headerText={'Новая тема'}
      toolbarIcons={toolbarIcons}
    >
      <div className={classes.root}>
        <div className={classes.padding}>
          <Alert severity="info" className={classes.infoAlert}>
            Чтобы поменять цвет в теме, нажмите на его поле, а затем выберите
            нужный цвет.
          </Alert>
          {paletteItems.map((e, i) => (
            <PaletteGridItem
              key={i}
              items={e.items}
              title={e.title}
              setSelected={setSelectedItem}
              selectedItem={selectedItem}
            />
          ))}
        </div>
      </div>
      <ColorPicker />
    </OutsidePage>
  )
}

export default NewTheme
