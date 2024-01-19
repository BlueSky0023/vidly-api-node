import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import { ToastContainer } from 'react-toastify';

import Movies from './components/movies';
import Navbar from './components/navBar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import LoginForm from './components/login';
import RegisterForm from './components/register';
import Logout from './components/logout';
import MoviesForm from './components/movieForm';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}

	render() {
		const { user } = this.state;

		return (
			<React.Fragment>
				<ToastContainer />
				<Navbar user={user} />
				<main className='container'>
        <h1>Home Calling</h1>
					<Switch>
						<Route path='/login' component={LoginForm} />
						<Route path='/logout' component={Logout} />
						<Route path='/register' component={RegisterForm} />
						<ProtectedRoute path='/movies/:id' component={MoviesForm} />
						<Route
							path='/movies'
							render={props => <Movies {...props} user={user} />}
						/>
						<Route path='/customers' component={Customers} />
						<Route path='/rentals' component={Rentals} />
						<Route path='/not-found' component={NotFound} />
						<Redirect exact from='/' to='/movies' />
						<Redirect to='/not-found' />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
