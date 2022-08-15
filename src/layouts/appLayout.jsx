import React from "react";
import { Spinner } from "react-bootstrap";
import Header from "../components/navbar";
import LoadingOverlay from "react-loading-overlay";
import Sidebar from "../components/navbar/sidebar";

const AppLayout = ({ loading, children, page }) => {
	return (
		<LoadingOverlay
			active={loading}
			spinner={<Spinner animation="border" variant="info" />}
			text=""
			styles={{
				content: (base) => ({
					...base,
					color: "#919191",
					marginTop: "50vh",
				}),
				overlay: (base) => ({
					...base,
					zIndex: 99,
					color: "#919191",
					backgroundColor: "rgba(255,255,255,.5)",
					height: "100%",
					minHeight: "100vh",
				}),
			}}
		>
			<Header page={page} />
			<Sidebar />
			{children}
		</LoadingOverlay>
	);
};

export default AppLayout;
