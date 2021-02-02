import * as React from 'react'
import { Paper, InputBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useSearchStyles = makeStyles((theme) => ({
  search: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(2),
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    flex: 1,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 2),
    width: '100%',
  },
}))

const SearchBar = ({ inputRef = null, onChange = null }) => {
  const classes = useSearchStyles()

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Paper elevation={0} className={classes.search}>
        <InputBase

          name="q"
          onChange={onChange}
          inputRef={inputRef}
          placeholder={'Поиск среди хабов'}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </Paper>
    </form>
  )
}

export default React.memo(SearchBar)
