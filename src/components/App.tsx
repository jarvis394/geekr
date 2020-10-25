import * as React from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { makeStyles } from '@material-ui/core/styles/'
import { BrowserRouter as Router } from 'react-router-dom'
import { MIN_WIDTH as minWidth } from '../config/constants'
import isMobile from 'is-mobile'
import { inject, observer } from 'mobx-react'

const chromeAddressBarHeight = 56
const useStyles = makeStyles((theme) => ({
  app: {
    display: 'flex',
    minHeight: `calc(100vh - 48px - ${
      isMobile() ? chromeAddressBarHeight : 0
    }px - 196px)`,
    borderRadius: 0,
    flexDirection: 'column',
    maxWidth: minWidth,
    margin: '48px auto 0 auto',
  },
}))

@inject('settingsStore')
@observer
export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    //@ts-ignore
    const settingsStore = this.props.settingsStore
    const classes = useStyles()
    return (
      <ThemeProvider theme={settingsStore.theme}>
        <Router>
          {/* <AppBar /> */}
          <div className={classes.app}>
            {/* <Tabs />
            <AppRouter /> */}
          </div>
          {/* <Footer /> */}
        </Router>
      </ThemeProvider>
    )
  }
}
