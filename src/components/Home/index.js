import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import Taucharts from "taucharts";
import { store } from "../../store";
import { push } from "react-router-redux";
import {
	APP_LOAD,
	SELECT_WORKER,
	LOGOUT,
	REDIRECT
} from "../../constants/actionTypes";

import "../../styles/variables.css";
import "../../styles/nav.css";
import "../../styles/workers.css";
import "taucharts/dist/taucharts.min.css";
import "taucharts/dist/plugins/tooltip.js";
import "taucharts/dist/plugins/tooltip.css";

const mapStateToProps = state => ({
	...state.common
});

const mapDispatchToProps = dispatch => ({
	onLoad: authenticated => dispatch({ type: APP_LOAD, auth: authenticated }),
	onLogout: () => dispatch({ type: LOGOUT }),
	selectWorker: value => dispatch({ type: SELECT_WORKER, workerID: value }),
	onRedirect: () => dispatch({ type: REDIRECT })
});

let chart;

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.onSelectWorker = this.onSelectWorker.bind(this);
		this.onLogout = this.onLogout.bind(this);
	}

	onSelectWorker(event) {
		this.props.selectWorker(event.value);
	}

	onLogout(event) {
		this.props.onLogout();
	}

	componentDidMount() {
		let user = localStorage.getItem("auth");
		this.props.onLoad(user ? true : false);

		chart.renderTo("#bar"); // Render Chart on initial load.
	}

	componentDidUpdate() {
		chart.renderTo("#bar"); // Re-render Chart on component update.
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.redirectTo) {
			store.dispatch(push(nextProps.redirectTo));
			this.props.onRedirect();
		}
	}

	render() {
		let workersList = this.props.workersList;
		let workerID = this.props.workerID;
		let workerDetails = workersList[workerID];
		let workersOptions = this.props.workersOptions;

		let workerName = workerDetails.name;
		let designation = workerDetails.designation;
		let lastActiveZone = workerDetails.lastZone;
		let data = workerDetails.zoneDetails;
		let supervisor = workerDetails.supervisor;
		let totalHours = workerDetails.zoneDetails.reduce(
			(a, b) => a + Number(b.Hours),
			0
		);

		// Destroying previous Chart reference.
		if (chart) {
			chart.destroy();
		}

		// Chart initialization.
		chart = new Taucharts.Chart({
			data: data,
			type: "bar",
			x: "Zone",
			y: "Hours",
			color: "Zone",
			plugins: [Taucharts.api.plugins.get("tooltip")()]
		});

		return (
			<React.Fragment>
				<nav>
					<div className="flex">
						<div className="heading">
							<p className="title">Overview</p>
							<p className="subtitle">Workers</p>
						</div>
						<div className="user">
							<p>
								<i className="fas fa-user" />
							</p>
							<p className="subtitle">Balasubramani M</p>
							<p className="separator">|</p>
							<div className="logout" onClick={this.onLogout}>
								<p className="subtitle">Logout </p>
							</div>
						</div>
					</div>
				</nav>
				<section>
					<div className="container">
						<div className="workers">
							<div className="list">
								<div className="flex flex-column">
									<Select
										defaultValue={workersOptions[0]}
										onChange={this.onSelectWorker}
										options={workersOptions}
										id="subreddits"
										className="subreddits"
									/>
								</div>
							</div>
							<div className="vdivider" />
							<div className="detail">
								<div className="header">
									<div className="flex">
										<div
											onClick={this.selectWorker}
											className="worker flex flex-item"
										>
											<p className="icon">
												<i className="fas fa-user-circle" />
											</p>
											<div className="name">
												<p className="title">
													{workerName}
												</p>
												<p className="subtitle">
													{designation}
												</p>
											</div>
										</div>
										<div
											onClick={this.selectWorker}
											className="supervisor flex"
										>
											<div className="name">
												<p className="title">
													{supervisor}
												</p>
												<p className="subtitle">
													Supervisor
												</p>
											</div>
											<p className="icon">
												<i className="fas fa-user-circle" />
											</p>
										</div>
									</div>
								</div>
								<div className="divider" />
								<div className="flex-item">
									<div className="flex flex-column chart">
										<div className="flex assets">
											<div className="asset">
												<p>Total hours worked</p>
												<p className="count">
													{totalHours}
												</p>
											</div>
											<div className="asset">
												<p>Last active zone</p>
												<p className="count">
													{lastActiveZone}
												</p>
											</div>
										</div>
										<div className="flex-item" id="bar" />
									</div>
								</div>
								<div className="divider" />
								<div className="footer">
									<p>Assigned Helmets</p>
									<div className="flex assets">
										<div className="asset">
											<p>
												<span>
													<i className="fas fa-briefcase" />
												</span>
												<span>#399-1029</span>
											</p>
											<p>
												<span>
													<i className="fas fa-id-card-alt" />
												</span>
												<span>IN-006</span>
											</p>
											<p>
												<span>
													<i className="fas fa-clock" />
												</span>
												&nbsp;
												<span>7 mins ago</span>
											</p>
										</div>
										<div className="asset">
											<p>
												<span>
													<i className="fas fa-briefcase" />
												</span>
												<span>#101-2234</span>
											</p>
											<p>
												<span>
													<i className="fas fa-id-card-alt" />
												</span>
												<span>IN-008</span>
											</p>
											<p>
												<span>
													<i className="fas fa-clock" />
												</span>
												&nbsp;
												<span>4 days ago</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
