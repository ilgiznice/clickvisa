import React, {Component} from 'react';
import tabs from './../configs/tabs.json';
import PhotoGenerator from './photo-gen.js';
import QandAGenerator from './qa-gen.js';

export default class SecondScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: tabs,
			focused: 0
		};
	}

	clicked(index) {
		this.setState({
			focused: index
		});
	}

	render() {
		let tabs = this.state.tabs;
		let focusedIndex = this.state.focused;
		let self = this;
		return (
			<div id="second-screen">
				<div>
					<ul className="tabs">{
						tabs.map((item, i) => {
							let style = "";
							if (focusedIndex == i) style = 'focused';
							return <li key={i} onClick={self.clicked.bind(self, i)} className={style}>{item.tab}</li>
						})
					}</ul>
				</div>
				<PhotoGenerator tabIndex={this.state.focused} />
				<QandAGenerator tabIndex={this.state.focused} />
				<label htmlFor="number">Номер телефона</label>
				<input type="text" id="number" className="number" />
				<label htmlFor="email">Адрес электронной почты</label>
				<input type="text" id="email" className="number" />
				<button>Оплатить</button>
			</div>
		);
	}
}
