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
