import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { MagnificentProvider } from "./contexts";
import { Provider } from "react-redux";
import { store } from "./store";
// Call make Server
makeServer();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<MagnificentProvider>
				<App />
			</MagnificentProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
