import React from "react";
import ReactDOM from "react-dom";

import "./Modal.css";

export const Modal = ({ palette, handleClick }) => {
	return ReactDOM.createPortal(
		<div className="note__palette_wrapper">
			<ul className="note__palette">
				{palette.map((c) => {
					return (
						<li
							onClick={handleClick}
							key={c.color}
							className={c.className}
						></li>
					);
				})}
			</ul>
		</div>,
		document.getElementById("react__portal")
	);
};
