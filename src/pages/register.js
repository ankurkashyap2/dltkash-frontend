import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AppLayout from "../layouts/appLayout";
import EntityDetailsForm from "../components/auth/entityDetailsForm";
import PersonalDetailsForm from "../components/auth/personalDetailsForm";
import { ReactComponent as TickIcon } from "../components/icons/tick-blue.svg";
import "../styles/register.css";

const Register = ({ loading }) => {
	const [activeTab, setActiveTab] = useState("entity");
	const [entityDetails, setEntityDetails] = useState(null);

	return (
		<AppLayout page="Registration" loading={loading}>
			<div className="main-content">
				<div className="outer-box">
					<div className="Register-box">
						<Tabs
							defaultActiveKey={activeTab}
							activeKey={activeTab}
							id="uncontrolled-tab-example"
							className={
								activeTab === "entity" ? "btn-tab btn1 mb-3" : "btn-tab btn2 mb-3"
							}
						>
							<Tab
								eventKey="entity"
								title={
									<div className="tab-title-box">
										<div className="tab-title-number">
											{activeTab === "entity" ? 1 : <TickIcon />}
										</div>{" "}
										Entity Details
									</div>
								}
							>
								<EntityDetailsForm
									setActiveTab={setActiveTab}
									setEntityDetails={setEntityDetails}
								/>
							</Tab>
							<Tab
								eventKey="personalDetails"
								title={
									<div className="tab-title-box">
										<div className="tab-title-number">2</div> Personal Information
									</div>
								}
							>
								<PersonalDetailsForm
									setActiveTab={setActiveTab}
									entityDetails={entityDetails}
								/>
							</Tab>
						</Tabs>
					</div>
				</div>
			</div>
		</AppLayout>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.user.loading,
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
