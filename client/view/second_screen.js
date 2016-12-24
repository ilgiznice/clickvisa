import React, {Component} from 'react';
import tabs from './../configs/tabs.json';
import PhotoGenerator from './photo-gen.js';
import QandAGenerator from './qa-gen.js';
import WorkData from './../business/get_data.js';

export default class SecondScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			workingWithData: new WorkData(),
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
		let handler = () => {
			this.state.workingWithData.getData();
		}
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
				<PhotoGenerator tabIndex={this.state.focused} WorkData={this.state.workingWithData} />
				<QandAGenerator tabIndex={this.state.focused} />
				<div id="customer-data">
					<label htmlFor="number">Номер телефона</label>
					<input type="text" id="number" className="number" name="Номертелефона"/>
					<label htmlFor="email">Адрес электронной почты</label>
					<input type="text" id="email" className="number" name="email"/>
					<input type="submit" onClick={handler} value="Оплатить"/>
				</div>
			</div>
		);
	}
}
