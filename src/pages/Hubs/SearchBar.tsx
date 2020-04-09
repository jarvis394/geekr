import * as React from 'react'
import { Paper, InputBase, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useSearchStyles = makeStyles((theme) => ({
  search: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(2),
  },
  searchButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    textTransform: 'none',
    fontFamily: 'Google Sans',
    fontSize: 16,
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

const SearchBar = () => {
  const classes = useSearchStyles()

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Paper elevation={0} className={classes.search}>
        <InputBase
          autoFocus
          name="q"
          placeholder={'Поиск'}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
        <Button
          type="submit"
          disableElevation
          color="primary"
          variant="contained"
          className={classes.searchButton}
        >
          Найти
        </Button>
      </Paper>
    </form>
  )
}

export default SearchBar
