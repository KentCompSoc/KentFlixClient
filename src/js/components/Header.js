// React
import React, { Component } from "react";
// Router
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { clearToken } from "../actions/user";
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// Styles
const styles = {
	grow: {
		flexGrow: 1,
	},
};
class Header extends Component {
	state = {
		anchorEl: null
	}

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	logout = () => {
		this.handleClose();
		this.props.clearToken();
	}

	render() {
		const { token, classes } = this.props;
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);
		return (
			<AppBar position="sticky">
				<Toolbar>
					<div className={classes.grow}>
						<Button color="inherit" component={Link} to="/dashboard/" >
							Dashboard
						</Button>
					</div>
					{ token ? (
						<React.Fragment>
							<IconButton
								aria-owns={open ? "account-menu" : undefined}
								aria-haspopup="true"
								onClick={this.handleMenu}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id="account-menu"
								anchorEl={anchorEl}
								anchorOrigin={{ vertical: "top", horizontal: "right" }}
								transformOrigin={{ vertical: "top", horizontal: "right" }}
								open={open}
								onClose={this.handleClose}
							>
								<MenuItem
									component={Link} to="/profile/"
									onClick={this.handleClose}
								>
									Profile
								</MenuItem>
								<MenuItem onClick={this.logout}>
									Logout
								</MenuItem>
							</Menu>
						</React.Fragment>
					) : (
						<Button variant="contained" component={Link} to="/login/">
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
		)
	}
};

function mapStateToProps ({ user }) {
	return {
		token: Boolean(user.token)
	}
}

function mapDispatchToProps (dispatch) {
	return {
		clearToken: (data) => dispatch(clearToken(data))
	}
}

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header))