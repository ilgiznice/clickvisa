import React, {Component} from 'react';
import tabs from './../configs/tabs.json';
import docs from './../configs/docs.json';

export default class PhotoGenerator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: tabs,
			docs: docs,
			workingWithData: this.props.WorkData
		}
	}

	render() {
		let tabs = this.state.tabs,
			docs = this.state.docs;
		let handler = (e) => {
			this.state.workingWithData.getPhotos(e.target);
		}
		return (
			<form id="uploadForm"
			          enctype="multipart/form-data"
			          action="/drive"
			          method="post">
					{
						/*tabs[this.props.tabIndex].docs.map((item, i) => {
							for(let j = 0, len = docs.length; j < len; j++) {
								if(item == docs[j].id)
									return <label key={i}>{docs[j].text}
										<input id={docs[j].text} type="file" className="photo_upload" name={docs[j].text} onChange={handler}/>
										   </label>
							}
						})*/
					}
					<input type="file" name="userPhoto" />
				</form> 
		);
	}
}
