import React, { useState, useRef } from 'react'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { fade, makeStyles } from '@material-ui/core/styles'
import { MIN_WIDTH, READER_FONT_FAMILIES } from 'src/config/constants'
import { useSelector } from 'src/hooks'
import { useDispatch } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  Input,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@material-ui/core'
import { setSettings } from 'src/store/actions/settings'
import { UserSettings } from 'src/interfaces'
import FormattedText from 'src/components/formatters/FormattedText'

const useStyles = makeStyles<
  Theme,
  { readerSettings: UserSettings['readerSettings'] }
>((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
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
  previewBox: {
    background: theme.palette.background.default,
    margin: theme.spacing(1.8, 2),
    borderRadius: 8,
    padding: theme.spacing(1.8, 2),
    '& p': {
      margin: 0,
      fontSize: ({ readerSettings }) => readerSettings.fontSize,
      fontFamily: ({ readerSettings }) => readerSettings.fontFamily,
    },
    '& p+p': {
      marginTop: theme.spacing(3),
    },
  },
}))

const previewText = `
  <p>
    Это случилось: Хабр получил новый дизайн в стиле остальных
    ТМ-продуктов.
  </p>
  <p>
    Вообще-то я люблю перемены, и редизайн привычных вещей вызывает в
    первую очередь оптимизм. Это как перестановка мебели в квартире:
    обстановочку освежать надо. Но помимо приятного чувства новизны
    некоторые изменения вызывают вопросы. Понятно, что Хабр уже не
    торт и мы всегда будем помнить его тёплое ламповое старое лого, но
    я хочу поговорить про то, что можно оценить вполне объективно —
    про юзабилити нового хабрадизайна.
  </p>
`

const SwitchButton: React.FC<{
  primary: React.ReactNode
  secondary?: React.ReactNode
  checked: boolean
  onChange: () => void
}> = ({ primary, secondary, checked, onChange }) => {
  return (
    <ListItem button onClick={() => onChange()}>
      <ListItemText primary={primary} secondary={secondary} />
      <Switch disableRipple checked={checked} color="primary" />
    </ListItem>
  )
}

const Reader = () => {
  const theme = useTheme()
  const readerSettings = useSelector((store) => store.settings.readerSettings)
  const classes = useStyles({ readerSettings })
  const fontSizeInputRef = useRef<HTMLInputElement>(null)
  const [isFontSizeDialogOpen, setFontSizeDialogOpen] = useState(false)
  const [isFontFamilyDialogOpen, setFontFamilyDialogOpen] = useState(false)
  const [fontFamilyRadioValue, setFontFamilyRadioValue] = useState(
    readerSettings.fontFamily
  )
  const radioGroupRef = React.useRef<HTMLElement>(null)
  const dispatch = useDispatch()
  const setReaderSettings = (field: string, value: unknown) => {
    dispatch(
      setSettings({
        readerSettings: {
          ...readerSettings,
          [field]: value,
        },
      })
    )
  }
  const handleFontSizeDialogCancel = () => setFontSizeDialogOpen(false)
  const handleFontFamilyDialogCancel = () => setFontFamilyDialogOpen(false)
  const handleFontSizeDialogSubmit = () => {
    setReaderSettings(
      'fontSize',
      parseInt(fontSizeInputRef.current?.value || '0', 10) ||
        readerSettings.fontSize
    )
    setFontSizeDialogOpen(false)
  }
  const handleFontFamilyDialogSubmit = () => {
    setReaderSettings('fontFamily', fontFamilyRadioValue)
    setFontFamilyDialogOpen(false)
  }
  const handleFontFamilyRadioValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFontFamilyRadioValue((event.target as HTMLInputElement).value)
  }

  return (
    <OutsidePage
      headerText={'Параметры чтения'}
      disableShrinking
      backgroundColor={theme.palette.background.paper}
    >
      <div className={classes.root}>
        <div className={classes.section}>
          <Typography className={classes.sectionHeader}>
            Предпросмотр
          </Typography>
          <div className={classes.previewBox}>
            <FormattedText>{previewText}</FormattedText>
          </div>
        </div>
        <div className={classes.section}>
          <Dialog
            open={isFontSizeDialogOpen}
            onClose={handleFontSizeDialogCancel}
          >
            <DialogTitle>Размер шрифта</DialogTitle>
            <DialogContent>
              <TextField
                label="Размер в px"
                inputRef={fontSizeInputRef}
                defaultValue={readerSettings.fontSize}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleFontSizeDialogCancel} color="primary">
                Отмена
              </Button>
              <Button
                color="primary"
                variant="contained"
                disableElevation
                onClick={handleFontSizeDialogSubmit}
              >
                Сохранить
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={isFontFamilyDialogOpen}
            onClose={handleFontFamilyDialogCancel}
          >
            <DialogTitle>Шрифт</DialogTitle>
            <DialogContent dividers>
              <RadioGroup
                ref={radioGroupRef}
                aria-label="font-family"
                name="font-family"
                value={fontFamilyRadioValue}
                onChange={handleFontFamilyRadioValueChange}
              >
                {READER_FONT_FAMILIES.map((e) => (
                  <FormControlLabel
                    value={e}
                    key={e}
                    control={<Radio color="primary" />}
                    label={e}
                  />
                ))}
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleFontFamilyDialogCancel} color="primary">
                Отмена
              </Button>
              <Button
                color="primary"
                variant="contained"
                disableElevation
                onClick={handleFontFamilyDialogSubmit}
              >
                Сохранить
              </Button>
            </DialogActions>
          </Dialog>

          <Typography className={classes.sectionHeader}>Текст</Typography>
          <ListItem button onClick={() => setFontSizeDialogOpen(true)}>
            <ListItemText
              primary={'Размер шрифта'}
              secondary={readerSettings.fontSize + 'px'}
            />
          </ListItem>
          <ListItem button onClick={() => setFontFamilyDialogOpen(true)}>
            <ListItemText
              primary={'Шрифт'}
              secondary={readerSettings.fontFamily}
            />
          </ListItem>
        </div>
        <div className={classes.section}>
          <Typography className={classes.sectionHeader}>Параметры</Typography>
          <SwitchButton
            primary={
              <>
                Заменять ссылки с{' '}
                <Typography component="span" color="primary">
                  habr.com
                </Typography>{' '}
                на{' '}
                <Typography component="span" color="primary">
                  geekr.vercel.app
                </Typography>
              </>
            }
            checked={readerSettings.changeLinks}
            onChange={() => {
              setReaderSettings('changeLinks', !readerSettings.changeLinks)
            }}
          />
          <SwitchButton
            primary={'Скрыть изображения и медиаэлементы'}
            secondary={'Позволит уменьшить потребление трафика'}
            checked={readerSettings.replaceImagesWithPlaceholder}
            onChange={() => {
              setReaderSettings(
                'replaceImagesWithPlaceholder',
                !readerSettings.replaceImagesWithPlaceholder
              )
            }}
          />
        </div>
      </div>
    </OutsidePage>
  )
}

export default React.memo(Reader)
