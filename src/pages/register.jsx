import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Navbar from "../components/navbar";
import "../styles/register.css";
import EntityDetailsForm from "../components/auth/entityDetailsForm";
import PersonalDetailsForm from "../components/auth/personalDetailsForm";

const Register = ({ history }) => {
	const [activeTab, setActiveTab] = useState("entity");
	const [entityDetails, setEntityDetails] = useState(null);

	return (
		<>
			<Navbar page="Register" />
			<div class="main-content">
				<div className="outer-box">
					<div className="Register-box">
						<Tabs
							defaultActiveKey={activeTab}
							activeKey={activeTab}
							id="uncontrolled-tab-example"
							className="btn-tab mb-3"
						>
							<Tab eventKey="entity" title="1. Entity Details">
								<EntityDetailsForm
									setActiveTab={setActiveTab}
									setEntityDetails={setEntityDetails}
								/>
							</Tab>
							<Tab eventKey="personalDetails" title="2. Personal Information">
								<PersonalDetailsForm
									setActiveTab={setActiveTab}
									entityDetails={entityDetails}
								/>
							</Tab>
						</Tabs>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
