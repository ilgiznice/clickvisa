import React, {Component} from 'react';
import $ from 'jquery';
import tabs from "./../configs/tabs.json";
import questions from "./../configs/questions.json";

export default class QandAGenerator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: tabs,
			questions: questions,
			country: 0,
			addField: [],
		};
	}

	QuestionsRender(tabIndex, event) {
		let tabs = this.state.tabs,
			questions = this.state.questions;

		let Handler = (event) => {
			event.persist();
			const selected = (() => event.target.value === 'on' ? true : false)();
			return this.AnswerHandler(selected, parseInt(event.target.id, 10), event);
		}

		const findItem = i => {
			if (this.state.addField) {
				const item = this.state.addField.filter(item => item.id === i);
				if (item.length) return item[0].items;
				else return null;
			}
		}

		return (
			tabs[tabIndex].questions.map((item, i) => {
				let question = questions.filter(o => o.id === item);
				if (!question.length) return true;
				else question = question[0];
				if(question.form) {
					return question.form.map(q => (
						<p key={i} className={'input' + i}>{question.text}
							<input className="need" type="text" placeholder={q.placeholder} />
						</p>
					));
				} else {
					return (
						<div key={i} className={'questions' + i}>{question.text}
							<input id={item + 'answer'} className="need" type="radio" name={ item + 'answer'} value="on" onClick={Handler} />Да
							<input id={item + 'answer'} className="need" type="radio" name={ item + 'answer'} value="off" onClick={Handler} />Нет
							<div id={'field' + i}>
								{this.state.addField && findItem(item)}
							</div>
						</div>
					);
				}
			})
		);
	}

	AnswerHandler(answer, id, event) {
		let questions = this.state.questions,
			field = [];

		const result = (() => answer ? 'yes' : 'no')();
		if (questions[id].answer && questions[id].answer[result]) {
			if (questions[id].answer[result].text
				&& questions[id].answer[result].form
				&& questions[id].answer[result].form.length) {
				field = questions[id].answer[result].form.map((item, i) => (
					<p key={i} className={'input' + i}>
						{questions[id].answer[result].text}
						<input className="need" type="text" placeholder={item.placeholder}/>
					</p>
				));
			}
		}
		field = {
			id,
			items: field,
		};
		if (field.items && field.items.length) {
			const item = this.state.addField.filter(f => f.id === field.id);
			if (!item.length) {
				this.state.addField.push(field)
				this.setState({
					addField: this.state.addField,
				});
			}
		} else {
			this.setState({
				addField: this.state.addField.filter(f => f.id !== field.id),
			});
		}

		// if(questions[id].answer) {
		// 	if(answer == true) {
		// 		if(questions[id].answer[0].yes == null) {
		// 			this.setState({
		// 				addField: null
		// 			});
		// 			return false;
		// 		}
		// 		if(questions[id].answer[0].yes.text) {
		// 			questions[id].answer[0].yes.form.map((item, i) => {
		// 				for(let c = 0, len = questions[id].answer[0].yes.form.length; c < len; c++)
		// 					field.push(<p key={i} className={'input' + i}>{questions[id].answer[0].yes.text}
		// 								<input type="text" placeholder={questions[id].answer[0].yes.form[c].placeholder} />
		// 							</p>);
		// 				})
		// 			}
		// 	} else {
		// 		if(questions[id].answer[1].no == null) {
		// 			return false;
		// 		}
		// 		if(questions[id].answer[1].no.text) {
		// 			questions[id].answer[1].no.form.map((item, i) => {
		// 				console.log(item);
		// 					field.push(<p key={i} className={'input' + i}>{questions[id].answer[1].no.text}
		// 								<input type="text" placeholder={questions[id].answer[1].no.form[i].placeholder} />
		// 							  </p>);
		// 				})
		// 			}
		// 		}
		// }
		// this.setState({
		// 	addField: field
		// });
	}

	render() {
		return(
			<div id = "question-form">
				{this.QuestionsRender(this.props.tabIndex)}
			</div>
		);
	}
}
