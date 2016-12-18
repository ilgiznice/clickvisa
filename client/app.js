import React, {Component} from 'react';
import FirstScreen from './view/first_screen.js';
import SecondScreen from './view/second_screen.js';

export default class App extends Component {
	render() {
		return(
			<div>
				<FirstScreen />
				<SecondScreen />
			</div>
		);
	}
}
