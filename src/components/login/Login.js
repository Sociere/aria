import React from 'react';
import Axios from 'axios';
import Config from '../../Config';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: []
        };
    }

    login(event) {
        event.preventDefault();
        var form = new FormData(this.refs.form);
		var auth = {
			"grant_type":"password",
			"username":form.get("email"),
			"password":form.get("password"),
			"client_id":Config.OAuth_client,
			"client_secret":Config.OAuth_secret
		};
		Axios.post('oauth/token', auth).then(response => {
			var token = "Bearer " + response.data.access_token;
			var date = new Date();
			var expire = date.getTime() + (response.data.expires_in * 1000);
			Axios.get('user', {"headers":{"Authorization":token}}).then(user => {
				var session = {
					logged_in: true,
					username: user.data.name,
					gm_level: user.data.access_level,
					token: token,
					session_expire: expire
				}
				localStorage.setItem('session', JSON.stringify(session));
				this.props.close();
				this.props.setLogin(session);
			}).catch(message => {
				this.setState({error: "An error occured trying to read user details."});
			});
		}).catch(message => {
			console.log(message);
			this.setState({error: "Incorrect account credentials"});
		});
    }

    render() {
        if (!this.props.open) {
            this.state = {
                error: []
            };
            return null;
        }

        if (this.state.error.length) {
            var alert = (
                <div className="alert">{this.state.error}</div>
            );
        }

        return (
            <div className="login">
                <form onSubmit={this.login.bind(this)} ref="form">
                    <div className="prompt-close" onClick={this.props.close}>&#10006;</div>
                    <div className="prompt-title">Login</div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input className="text" name="email" type="text" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input className="password" name="password" type="password" />
                    </div>
                    {alert}
                    <input className="button" type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default Login;
