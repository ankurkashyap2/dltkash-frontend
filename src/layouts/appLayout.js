import React from "react";
import { Spinner } from "react-bootstrap";
import Header from "../components/navbar";
// import Footer from "../components/layout/footer";
import LoadingOverlay from "react-loading-overlay";

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
					zIndex: 9999,
					color: "#919191",
					backgroundColor: "rgba(255,255,255,.5)",
				}),
			}}
		>
			<Header page={page} />
			{children}
			{/* <Footer /> */}
		</LoadingOverlay>
	);
};

export default AppLayout;
