import { createContext, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { LoaderProvider } from "./loaderContext";
import { ScrollToTopProvider } from "./scrollToTopContext";
import { ThemeProvider } from "./themeContext";

const MagnificentContext = createContext();

export const useMagnificent = () => useContext(MagnificentContext);

export const MagnificentProvider = ({ children }) => {
	const value = "";
	return (
		<MagnificentContext.Provider value={value}>
			<BrowserRouter>
				<LoaderProvider>
					<ThemeProvider>
						<ScrollToTopProvider>{children}</ScrollToTopProvider>
					</ThemeProvider>
				</LoaderProvider>
			</BrowserRouter>
		</MagnificentContext.Provider>
	);
};
