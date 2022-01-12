// import logo from "./logo.svg";
// import "./App.css";
// import "./index.css";
// import Forget from "./components/Forget";
// import Navbar from "./components/Navbar";
// import Register from "./components/Register";
// import Login from "./components/Login";
// // import Dashboard from './components/Dashboard';

// function App() {
// 	return <div className="App">{/* <Dashboard /> */}</div>;
// }

// export default App;
import { Provider } from "react-redux";
import { store } from "./redux";
import AppRoutes from "./pages";
import { history } from "./redux";
import "./App.css";

const App = () => {
	return (
		<Provider store={store}>
			<AppRoutes history={history} />
		</Provider>
	);
};

export default App;
