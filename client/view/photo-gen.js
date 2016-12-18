import React, {Component} from 'react';
import tabs from './../configs/tabs.json';
import docs from './../configs/docs.json';

export default class PhotoGenerator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: tabs,
			docs: docs,
		}
	}

	render() {
		let tabs = this.state.tabs,
			docs = this.state.docs;
		
		return (
				<div id = "photo-form">
					{
						tabs[this.props.tabIndex].docs.map((item, i) => {
							for(let j = 0, len = docs.length; j < len; j++) {
								if(item == docs[j].id)
									return <div key={i}>
												<p>{docs[j].text}</p>
												<input type="file" className="photo_upload" />
										   </div>
							}
						})
					}
				</div> 
		);
	}
}
