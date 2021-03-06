import { Component } from "react"

import Routes from "./routes/Routes"
import Footer from "./layout/Footer/Footer"
import Navigation from "./layout/ButtonAppBar/Navigation"
import AuthService from "../service/auth.service"
import backgroundImage from "../assets/indexBackground.jpg"

import { CssBaseline, ThemeProvider, withStyles } from "@material-ui/core"
import theme from "./theme"
// import Alert from './shared/Alert/Alert'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedUser: null,
      bookingSearchInput: ''
      // alert: {
      //   show: false,
      //   title: '',
      //   text: ''
      // }
    }
    this.authService = new AuthService()
  }

  storeUser(loggedUser) {
    this.setState({ loggedUser })
  }

  fetchUser() {
    this.authService
      .isLoggedIn()
      .then((response) => this.storeUser(response.data))
      .catch(err => {
        this.storeUser(err.loggedUser)
      })
  }

  componentDidMount() {
    this.fetchUser()
  }

  fetchInputData(input) {
    this.setState({ bookingSearchInput: input })
  }

  // handleAlert = (show, title, text) => this.setState({ alert: { show, title, text } })

  render() {
    const { classes } = this.props
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation
          storeUser={(user) => this.storeUser(user)}
          loggedUser={this.state.loggedUser}
          fetchInputData={input => this.fetchInputData(input)}
        /* handleAlert={this.handleAlert} */
        />
        <main className={classes.container}>
          {this.state.loggedUser !== null &&
            <Routes
              storeUser={(user) => this.storeUser(user)}
              loggedUser={this.state.loggedUser}
              bookingSearchInput={this.state.bookingSearchInput}
            /* handleAlert={this.handleAlert} */
            />
          }
        </main>
        <Footer />

        {/* <Alert handleAlert={this.handleAlert} show={this.state.alert.show} title={this.state.alert.title} text={this.state.alert.text} /> */}
      </ThemeProvider>
    )
  }
}

const styles = () => ({
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    minHeight: "93vh"
  },
})

export default withStyles(styles)(App)
