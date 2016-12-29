import React, {Component} from 'react';
import $ from 'jquery';
import tabs from "./../configs/tabs.json";
import questions from "./../configs/questions.json";

export default class QandAGenerator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: this.props.Type,
			questions: questions,
			country: 0,
			addField: [],
		};
	}

	QuestionsRender(tabIndex, event) {
		let tabs = this.state.tabs,
			questions = this.state.questions,
			index = this.props.tabIndex;
	
		if(tabs[index] === undefined) index = 0;

		let Handler = (event) => {
			event.persist();
			let elem = event.target;
			let selected = null;
			
			if(elem.parentNode.className == "onoffswitch enable") {
				elem.parentNode.className = "onoffswitch";
				selected = true;			
			} else {
			   	elem.parentNode.className = "onoffswitch enable";
				selected = false;			
			}
			
			return this.AnswerHandler(selected, parseInt(elem.id, 10), event);
		}

		const findItem = i => {
			if (this.state.addField) {
				const item = this.state.addField.filter(item => item.id === i);
				if (item.length) return item[0].items;
				else return null;
			}
		}

		return (
			tabs[index].questions.map((item, i) => {
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
				} else if(question.default == true){
					return (
						<div key={i} className="togglebutton">
							<label>{question.text}</label>
								<div className="onoffswitch">
								    <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id={item +  "myonoffswitch" + i} checked="" onClick={Handler}/>
								    <label className="onoffswitch-label" htmlFor={item  + "myonoffswitch" + i} data-toggle="collapse" data-target={'#field' + i} aria-expanded="true">
								        <span className="onoffswitch-inner"></span>
								        <span className="onoffswitch-switch"></span>
								    </label>
								</div>
							<div id={'field' + i} className="collapse" aria-expanded="true">
								{this.state.addField && findItem(item)}
							</div>
						</div>
					);
				} else {
					return (
						<div key={i} className="togglebutton">
							<label>{question.text}</label>
								<div className="onoffswitch enable" >
									<input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id={item +  "myonoffswitch" + i} checked="" onClick={Handler}/>
									<label className="onoffswitch-label" htmlFor={item  + "myonoffswitch" + i} data-toggle="collapse" data-target={'#field' + i} aria-expanded="true">
										<span className="onoffswitch-inner"></span>
										<span className="onoffswitch-switch"></span>
									</label>
								</div>
							<div id={'field' + i} className="collapse" aria-expanded="true">
								{this.state.addField && findItem(item)}
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
						<fieldset key={i}>
							<label htmlFor="inputAddress" className="col-xs-12 control-label">{questions[id].answer[result].text}</label>
							<div className="col-xs-10">
								<input type="text" className="form-control" id="inputAddress" placeholder={item.placeholder} />
							</div>
						</fieldset>
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
