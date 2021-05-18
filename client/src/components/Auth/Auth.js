import React, { useState } from 'react';

import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import Icon from './icon';

import Input from './Input';

const GOOGLE_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

export default function Auth() {

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const switchMode = () => {
        setIsSignup(prevIsSignup => !prevIsSignup);
        handleShowPassword(false);
    };

    const handleShowPassword = () => setShowPassword(prevShowPassword => !prevShowPassword);

    const googleSuccess = async(response) => {
        const result = response?.profileObj;
        const token = response?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push("/");
        } catch (e) {
            console.log(e.message);
        }
    };

    const googleFailure = async(error) => {
        console.log("Google Sign In was unsuccessful. Try again later.");
        console.log(error);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon />
                </Avatar>

                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} /> 
                        { isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}

                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{ isSignup ? 'Sign Up' : 'Sign In' }</Button>
                        <GoogleLogin 
                        clientId={GOOGLE_ID}
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} startIcon={<Icon />} variant="contained">Google Sign In </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                        />

                    </Grid>
                    <Grid container justify="center">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Container>
    )
}
