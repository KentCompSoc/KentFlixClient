// React
import React from "react";
import ReactDOM from "react-dom";
//Redux
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./js/reducers";
import { Provider } from "react-redux";
// Components
import App from "./js/App";
// Service worker
import * as serviceWorker from "./serviceWorker";
// Material-UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// Theme
const theme = createMuiTheme({
	typography: {
		useNextVariants: true,
	},
	palette: {
		type: "dark",
	}
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<React.Fragment>
		<CssBaseline />
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</MuiThemeProvider>
	</React.Fragment>
, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
