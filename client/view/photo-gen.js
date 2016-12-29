import React, {Component} from 'react';
import tabs from './../configs/tabs.json';
import docs from './../configs/docs.json';

export default class PhotoGenerator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: this.props.Type,
			docs: docs,
			workingWithData: this.props.WorkData
		}
	}
	
	render() {
		let tabs = this.state.tabs,
			docs = this.state.docs,
			index = this.props.tabIndex;
		let handler = (e) => {
			this.state.workingWithData.getPhotos(e.target);
		}
		if(tabs[index] === undefined) index = 0;
		console.log(tabs);
		return (
			<div className="foto-form nano right">
				<div className="nano-content">
					<form id="photo-form" action="/drive" encType="multipart/form-data" method="post">
							{
								tabs[index].docs.map((item, i) => {
									for(let j = 0, len = docs.length; j < len; j++) {
										if(item == docs[j].id)
											return <div key={i} className="foto-form_block loaded">
												<input id={docs[j].text} type="file" className="photo_upload zagruzit-foto right" name="file" onChange={handler}/>
														<i className="fa fa-times fa-2x" aria-hidden="true"></i>
													<div className="foto-form_icon">
														<img src={docs[j].img} alt="" />
														<p>{docs[j].text}</p>
													</div>
												</div>
									}
								})
							}
						</form> 
				</div>
			</div>
		);
	}
}
