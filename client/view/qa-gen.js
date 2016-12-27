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
						<div key={i} className="togglebutton">
							<fieldset>
								<label htmlFor="inputAddress" className="col-xs-12 control-label">{question.text}</label>
								<div className="col-xs-10">
									<input type="text" className="form-control" id="inputAddress" placeholder={q.placeholder} />
								</div>
							</fieldset>
						</div>
					));
				} else {
					return (
						<div key={i} className="togglebutton">
							<label>{question.text}</label>
								<div className="onoffswitch enable">
								    <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id={"myonoffswitch" + i} checked="" />
								    <label className="onoffswitch-label" htmlFor={"myonoffswitch" + i} data-toggle="collapse" data-target="#address" aria-expanded="true">
								        <span className="onoffswitch-inner"></span>
								        <span className="onoffswitch-switch"></span>
								    </label>
								</div>
						</div>
					);
				}
			})
		);
	}
/*<input id={item + 'answer'} className="need" type="radio" name={ item + 'answer'} value="on" onClick={Handler} />Да
							<input id={item + 'answer'} className="need" type="radio" name={ item + 'answer'} value="off" onClick={Handler} />Нет
							<div id={'field' + i}>
								{this.state.addField && findItem(item)}
							</div>*/

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
	}

	render() {
		return(
			<div id = "question-form" className="question-form left">
				{this.QuestionsRender(this.props.tabIndex)}
			</div>
		);
	}
}
