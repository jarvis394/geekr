import * as React from 'react'
import { Paper, InputBase, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import useQuery from 'src/hooks/useQuery'

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
  searchButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    textTransform: 'none',
    fontFamily: 'Google Sans',
    fontSize: 16,
  },
}))

const SearchBar: React.FC<{
  inputRef?: React.MutableRefObject<HTMLInputElement | null>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}> = ({ inputRef = null, onSubmit: onSubmitProp }) => {
  const classes = useSearchStyles()
  const searchParams = useQuery()
  const query = searchParams.get('q') || ''

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmitProp?.(e)
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Paper elevation={0} className={classes.search}>
        <InputBase
          name="q"
          inputRef={inputRef}
          defaultValue={query}
          placeholder={'Поиск среди хабов'}
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

export default React.memo(SearchBar)
