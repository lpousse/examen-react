import React, { useState } from 'react';
import { login } from '../services/AuthService';
import './LoginForm.scss';

type LoginFormProps = {
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

function LoginForm({setIsLoggedIn}: LoginFormProps) {

	const [loginError, setLoginError] = useState(false);
	const handleSubmitLogin = (event: any/*React.FormEvent<HTMLFormElement>*/) => {
		event.preventDefault();
		(async() => {
            const user = await login(event.target.username.value, event.target.password.value);
			console.log(user);
			if (user){
				setIsLoggedIn(true);
				setLoginError(false);
			}
			else
				setLoginError(true);
        })();
    };

    return (
        <form onSubmit={handleSubmitLogin}>
			<div className='row mb-3'>
				<label htmlFor='username' className='col-sm-2 col-form-label'>Username</label>
				<div className='col-sm-10'>
					<input type='text' className='form-control' id='username' name='username' />
				</div>
			</div>
			<div className='row mb-3'>
				<label htmlFor='password' className='col-sm-2 col-form-label'>Password</label>
				<div className='col-sm-10'>
					<input type='password' className='form-control' id='password' />
				</div>
			</div>
			{loginError ?
				<div className='row'>
					<p className='text-danger'>Login error</p>
				</div>
				: <></>
			}
			<button type='submit' className='btn btn-primary'>Submit</button>
		</form>
    );
};

export default LoginForm;