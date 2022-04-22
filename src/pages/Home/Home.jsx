import React from "react";
import "./Home.css";

import { useDocumentTitle } from "../../customHooks";

export const Home = () => {
	useDocumentTitle("Home | MS");

	return (
		<div className="home_page">
			<main className="main--home_page">
				<section className="note_editor_section">
					<div className="note_container">This is something</div>
					<div className="filter_panel__wrapper"></div>
				</section>
				<section className="note_lisiting_section"></section>
				<section className="note_lisiting_section"></section>
			</main>
		</div>
	);
};
