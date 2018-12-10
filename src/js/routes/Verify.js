// React
import React from 'react';
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StepContent from '@material-ui/core/StepContent';

const styles = theme => ({
	root: {
		padding: 5,
	},
});

const Verify = props => {
	const { classes } = props;
	const steps = [
		'Register',
		'Verify your Kent email',
		'Subscribe to your courses'
	];

	return (
		<div className={classes.root}>
			<Grid container spacing={8}>
				<Grid item xs={12}>
					<Stepper activeStep={1} orientation="vertical">
						{ steps.map((label, index) => {
							return (
								<Step key={label}>
									<StepButton
										completed={index === 0}
										disabled>
										{label}
									</StepButton>
									{ index === 1 && (
										<StepContent>
											<Typography variant="body1" gutterBottom>
												Check your email for a verification link (make sure to 
												check your spam/junk folder).
											</Typography>
											<Button
												variant="contained"
												target="_blank"
												href="https://live.kent.ac.uk/"
											>
												Your Kent Email
											</Button>
										</StepContent>
									)}
								</Step>
							);
						})}
					</Stepper>
				</Grid>
			</Grid>
		</div>
	);
}

export default withStyles(styles)(Verify);