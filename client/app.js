import React, {Component} from 'react';
import MainScreen from './view/main_screen.js';
import Nav from './view/nav_bar.js';

export default class App extends Component {
	render() {
		return(
			<div className="container-fluid">
				<Nav />
				<MainScreen />
			</div>
		);
	}
}
