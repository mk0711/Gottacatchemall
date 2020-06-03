import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import * as Paths from './paths';

class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            passwordConf: '',
            displayName: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    submitCredentials() {
        this.setState({ isBusy: true })
        let body = JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            passwordConf: this.state.passwordConf,
            displayName: this.state.displayName
        });

        fetch(Paths.userURL, {
            method: 'POST',
            body: body,
            headers: { 'Content-Type': 'application/json' }
        }).then(resp => {
            if (!resp.ok) {
                resp.text().then(text => {
                    window.alert('Error ' + resp.status + ' - ' + text)
                })
                throw new Error(resp)
            }
            return resp
        }).then(resp => {
            localStorage.setItem('auth', resp.headers.get('Authorization'))
            this.setState({ url: '/documents/', fireRedirect: true })
        }).catch(err => {
            console.log(err);
            this.setState({ error: err });
        }).then(() => {
            this.setState({ isBusy: false });
        });
    }

    render() {
        return (
            <div className="Login">
              <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    autoFocus
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                  />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                  Login
                </Button>
              </form>
            </div>
          );
        }
}

export default Signup;