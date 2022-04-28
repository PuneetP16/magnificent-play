import { createContext, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { AlertProvider } from "./alertContext";
import { AuthProvider } from "./authContext";
import { FilterProvider } from "./filterContext";
import { LoaderProvider } from "./loaderContext";
import { ScrollToTopProvider } from "./scrollToTopContext";
import { ThemeProvider } from "./themeContext";
import { UserProvider } from "./userContext";
import { VideoProvider } from "./videoContext";

const MagnificentContext = createContext();

export const useMagnificent = () => useContext(MagnificentContext);

export const MagnificentProvider = ({ children }) => {
	const value = "";
	return (
		<MagnificentContext.Provider value={value}>
			<BrowserRouter>
				<FilterProvider>
					<LoaderProvider>
						<AlertProvider>
							<ScrollToTopProvider>
								<AuthProvider>
									<VideoProvider>
										<UserProvider>
											<ThemeProvider>
												<LoaderProvider>{children}</LoaderProvider>
											</ThemeProvider>
										</UserProvider>
									</VideoProvider>
								</AuthProvider>
							</ScrollToTopProvider>
						</AlertProvider>
					</LoaderProvider>
				</FilterProvider>
			</BrowserRouter>
		</MagnificentContext.Provider>
	);
};
