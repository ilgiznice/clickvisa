import React, {Component} from 'react';
import tabs from './../configs/tabs.json';
import PhotoGenerator from './photo-gen.js';
import QandAGenerator from './qa-gen.js';
import WorkData from './../business/get_data.js';
import Nav from './nav_bar.js';

console.log(tabs);
export default class MainScreen extends Component {
	constructor(props) {
		super(props);
		
		let members_count = [
			{
				type: "adult"
			}
		]
		this.state = {
			workingWithData: new WorkData(),
			tabs: tabs,
			members_count: members_count,
			focused: 0,
			memFocused: 0
		};
	}

	clicked(index) {
		this.setState({
			focused: index,
		});
	}

	memClicked(index, type) {
		console.log(type);
		this.setState({
			memFocused: index,
			current: type
		});
	}

	memberAddClick() {
		let memArr = this.state.members_count;
		memArr.push({
			type: "kid"
		});
		this.setState({
			members_count: memArr
		});
	}
/*
li onClick={click(тип_визы)}
click(type) { this.setState({current: type})
Поля
input onChange={change(тип_визы, поле)}
change(e, type, field) {this.setState(data[type][field] = e,target.value}
Рендер
{this.state.current === 'ИП' && (<div>123</div>)}
<input value={this.state.ТИП_ВИЗЫ.ПОЛЕ} onChange=выше>
*/
	render() {
		let handler = () => {
			this.state.workingWithData.getData();
		}
		let tabs = this.state.tabs;
		let memArr = this.state.members_count;
		let focusedIndex = this.state.focused;
		let memFocusedIndex = this.state.memFocused;
		let self = this;
		return (
			<div className="container-fluid">
				<Nav />
				<aside className="aside-left">
					<ul className="ages_tabs">{
						memArr.map((item, i) => {
							let style = "";
							if(memFocusedIndex == i) style = "active";
							return <li key={i} className={style}>
								<a onClick={self.memClicked.bind(self, i, memArr[i].type)} 
									role="tab" 
									data-toggle="tab">
								<img src="static/img/user.png" alt="" /></a></li>
						})
					}</ul>
					<input type="submit" className="add_member" value="+" onClick={this.memberAddClick.bind(self)} />
				</aside>				
				<aside className="aside-right">
					<div className="all-progress">
						<div className="c100 p75 small orange">
							<span>75%</span>
							<div className="slice">
								<div className="bar"></div>
								<div className="fill"></div>
							</div>
						</div>
					</div>
					<div id="customer-data" className="question-form_two col-xs-12">
						<div className="form-group is-empty">
							<fieldset>
								<label htmlFor="inputTel" className="col-xs-12 control-label">Введите номер телефона</label>
								<div className="col-xs-12">
									<input type="tel" className="form-control" id="number" placeholder="+7" name="Номертелефона" />
								</div>
							</fieldset>
						</div>
						<div className="form-group form-group_email is-empty">
							<fieldset>
								<label htmlFor="inputEmail" className="col-xs-12 control-label">Введите адрес электронной почты</label>
								<div className="col-xs-12 customer-data">
									<input type="email" className="form-control" id="email" placeholder="Email" name="email" />
								</div>
							</fieldset>
						</div>
						<div className="form-price">
							<a onClick={handler} className="btn btn-raised btn-success">Оплатить<span>1499<i className="fa fa-rub" aria-hidden="true"></i></span></a>
						</div>
					</div>
				</aside>
				
				<div className="content">
					{
						memArr.map((item, i) => {
							let type = null;
							if(memFocusedIndex == i) {
								return (
									<div id={'block' + i} name={item.type} key={i}>
										<div className="content-top">
											<div className="type_tabs" className="btn-group btn-group-justified btn-group-raised">
												{
													tabs.map((item1, j) => {
														if(item1[item.type]) {
															type = item1[item.type];
															return type.map((tab, c) => {
																	console.log(tab.tab);
																	let style = "";
																	if (focusedIndex == c) style = 'active';
																	return <a key={c} onClick={self.clicked.bind(self, c)} className={'btn1 btn ' + style}>{tab.tab}</a>
																})
														}
													})
												}
											</div>
										</div>
										<div className="content-bottom">
											<PhotoGenerator Type={type} tabIndex={focusedIndex} WorkData={this.state.workingWithData} />
											<QandAGenerator Type={type} tabIndex={focusedIndex} />
										</div> 
									</div>
								);
							}
						})
					}
				</div>
			</div>
		);
	}
}
