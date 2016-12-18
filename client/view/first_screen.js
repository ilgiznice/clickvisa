import React, {Component} from 'react';

export default class FirstScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div id = "first">
				<input type = "text" className = "country" />
				<input type = "text" className = "mission" />
				<div id = "div_select" className = "people_count">
				
				</div> 
			</div> 
		);
	}
}
