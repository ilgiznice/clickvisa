import React, {Component} from 'react';

export default class Nav extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<nav className="">
				<div className="nav-top">
					<div className="logo">
						<img src="static/img/logo.png" alt="" />
					</div>
				</div>
				<div className="nav-bottom">
					<div className="tab-content">
							<div className="tab-pane active" id="user0">
							<div className="left user">
								<img src="static/img/user.png" alt="" />
								<p>Взрослый</p>
							</div>
							<div className="c100 p100 small green right">
								<span>100%</span>
								<div className="slice">
									<div className="bar"></div>
									<div className="fill"></div>
								</div>
							</div>
						</div>
						<div className="tab-pane fade" id="user1">
							<div className="left user">
								<img src="static/img/user.png" alt="" />
								<p>От 6 до 18 лет</p>
							</div>
							<div className="c100 p50 small orange right">
								<span>50%</span>
								<div className="slice">
									<div className="bar"></div>
									<div className="fill"></div>
								</div>
							</div>
						</div>
						<div className="tab-pane fade" id="user2">
							<div className="left user">
								<img src="static/img/user.png" alt="" />
								<p>От 0 до 6 лет</p>
							</div>
							<div className="c100 p50 small orange right">
								<span>50%</span>
								<div className="slice">
									<div className="bar"></div>
									<div className="fill"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav> 
		);
	}
}
