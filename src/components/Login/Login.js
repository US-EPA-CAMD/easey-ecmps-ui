import React, { useState, useEffect } from 'react';

import {
    Button,
    Label,
    TextInput,
    Form,
    FormGroup,
    Alert,
} from '@trussworks/react-uswds';

import { authenticate } from '../../utils/api/easeyAuthApi';
import LoadingModal from '../LoadingModal/LoadingModal';

const cdx_user = sessionStorage.getItem('cdx_user') ? JSON.parse(sessionStorage.getItem('cdx_user')) : false;

const Login = () => {
    const [formErrorMessage, setFormErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);

    const checkLoggedIn = () => {
        if (cdx_user) {
            window.location = '/monitoring-plans';
        }
    };

    const submitForm = async e => {
        e.preventDefault();

        if (username !== '') {
            setUsernameError(false);
        } else {
            setUsernameError(true);
        }
        if (password !== '') {
            setPasswordError(false);
        } else {
            setPasswordError(true);
        }

        if (username !== '' && password !== '') {
            setLoading(true);

            try {
                return await authenticate({ userId: username, password }).then(response => {
                    setLoading(false);

                    if (response.status === 'Valid') {
                        setUsername('');
                        setPassword('');
                        setFormErrorMessage('');
                    } else if (response.error) {
                        throw response.error;
                    }
                }).catch(catchErr => {
                    setLoading(false);

                    throw catchErr;
                });
            } catch (err) {
                setLoading(false);
                setFormErrorMessage(err.message);
            }
        }
    };

    useEffect(() => {
        checkLoggedIn();
    }, []);

    return (
        <div className="margin-10">
            <h1>Log In</h1>
            <div style={{ marginLeft: '4rem' }}>
                <Form onSubmit={submitForm}>
                    {formErrorMessage && <Alert type="error" heading="Authentication Error">
                        {formErrorMessage}
                    </Alert>}
                    <FormGroup>
                        {usernameError && <Alert type="error" heading="Username Error">
                            Username Error
                        </Alert>}
                        <Label htmlFor="username">Username</Label>
                        <TextInput
                            id="username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        {passwordError && <Alert type="error" heading="Password Error">
                            Password Error
                        </Alert>}
                        <Label htmlFor="password">Password</Label>
                        <TextInput
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </FormGroup>
                    <Button type="submit">
                        Login in
                    </Button>
                </Form>
            </div>
            <LoadingModal loading={loading} />
        </div>
    );
}

export default Login;
