import React, { useState } from 'react'
import Service from '../../services/api-fetch.service';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import { withRouter } from 'react-router-dom';


function RegisterComponent(props) {

    const useStyles = makeStyles((theme) =>
        createStyles({
            container: {
                display: 'flex',
                flexWrap: 'wrap',
                width: 400,
                margin: `${theme.spacing(0)} auto`
            },
            loginBtn: {
                marginTop: theme.spacing(2),
                flexGrow: 1
            },
            header: {
                textAlign: 'center',
                background: '#36425B',
                color: '#fff'
            },
            card: {
                marginTop: theme.spacing(10)
            }

        }),
    );

    const classes = useStyles();
    const [fullName, setFullName] = React.useState([])
    const [email, setEmail] = React.useState([])
    const [password, setPassword] = React.useState([])
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');

    const handleDisableButton = (e) => {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
        return email && emailRegex.test(email) && password && password.length >= 6 ? false : true
    };

    async function login() {
        const url = 'auth/register'
        const auth = new Service()
        const payload = Object.freeze({
            fullName: fullName,
            email: email,
            password: password,
        })

        const response = await auth.login(url, payload)
        if (!response) {
            setError(true)
            setHelperText('NETWORK ERROR');
        } else if (response.status >= 400) {
            setError(true)
            setHelperText(response.message)
        } else if (response && response.jwt) {
            setError(false)
            localStorage.setItem('jwt-token', response.jwt)
            return props.history.push('/')
        }
    }

    return (
        <div>
            <React.Fragment>
                <form className={classes.container} noValidate autoComplete="off">
                    <Card className={classes.card}>
                        <CardHeader className={classes.header} title="Signup" />
                        <CardContent>
                            <div>
                                <TextField
                                    error={error}
                                    fullWidth
                                    id="fullName"
                                    type="text"
                                    label={'Full Name'}
                                    placeholder={'full name'}
                                    margin="normal"
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                                <TextField
                                    error={error}
                                    fullWidth
                                    id="email"
                                    type="email"
                                    label={'Email'}
                                    placeholder={'email'}
                                    margin="normal"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    error={error}
                                    fullWidth
                                    id="password"
                                    type="password"
                                    label={'Password'}
                                    placeholder={'password'}
                                    margin="normal"
                                    helperText={helperText}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                className={classes.loginBtn}
                                onClick={() => login()}
                                disabled={handleDisableButton()}
                            >
                                {'REGISTER'}
                            </Button>
                        </CardActions>
                    </Card>
                </form>
            </React.Fragment>
        </div>
    )
}

export default withRouter(RegisterComponent);