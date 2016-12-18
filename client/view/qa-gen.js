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
		};
	}

	QuestionsRender(tabIndex) {
		let tabs = this.state.tabs,
			questions = this.state.questions;

		let Handler = (event) => {
			event.persist();
			new Promise((resolve, reject) => {
				if (event.target.value == "on") {
					resolve(this.setState({
						selected: true,
						id: parseInt(event.target.name, 10)
					}))
				} else {
					resolve(this.setState({
						selected: false,
						id: parseInt(event.target.name, 10)
					}))
				}
			}).then(() => {
				return this.AnswerHandler(this.state.selected, this.state.id, event);
			})
		}

		return (
			tabs[tabIndex].questions.map((item, i) => {
				for(let j = 0, len = questions.length; j < len; j++) {
					if(item == questions[j].id)
						if(questions[j].form) {
							for(let c = 0, len = questions[j].form.length; c < len; c++)
							return <p key={i} className={'input' + i}>{questions[j].text}
										<input type="text" placeholder={questions[j].form[c].placeholder} />
									</p>
						} else {
							return <div key={i} className={'questions' + i}>{questions[j].text}
									<input id={ i + 'answer'}  type="radio" name={ j + 'answer'} value="on" onClick={Handler} />Да
									<input id={ i + 'answer'}  type="radio" name={ j + 'answer'} value="off" onClick={Handler} />Нет
									<div id={'field' + i}></div>
								  </div>
						}
				}
			})
		);
	}

	AnswerHandler(answer, id, event) {
		let questions = this.state.questions,
			field = [];

		console.log(event.target)

		if(questions[id].answer) {
			if(answer == true) {
				if(questions[id].answer[0].yes == null) {
					this.setState({
						addField: null
					});
					return false;
				}
				if(questions[id].answer[0].yes.text) {
					questions[id].answer[0].yes.form.map((item, i) => {
						for(let c = 0, len = questions[id].answer[0].yes.form.length; c < len; c++)
							field.push(<p key={i} className={'input' + i}>{questions[id].answer[0].yes.text}
										<input type="text" placeholder={questions[id].answer[0].yes.form[c].placeholder} />
									</p>);
						})
					}
			} else {
				if(questions[id].answer[1].no == null) {
					return false;
				}
				if(questions[id].answer[1].no.text) {
					questions[id].answer[1].no.form.map((item, i) => {
						console.log(item);
							field.push(<p key={i} className={'input' + i}>{questions[id].answer[1].no.text}
										<input type="text" placeholder={questions[id].answer[1].no.form[i].placeholder} />
									  </p>);
						})
					}
				}
		}
		this.setState({
			addField: field
		});
	}

	render() {
		return(
			<div id = "question-form">
				{this.QuestionsRender(this.props.tabIndex)}
			</div>
		);
	}
}
