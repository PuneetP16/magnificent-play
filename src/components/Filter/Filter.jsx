import { useNavigate } from "react-router-dom";
import { useFilter, useVideo } from "../../contexts";
import "./Filter.css";

export const Filter = () => {
	const { byLatest, category, filterDispatch } = useFilter();
	const {
		videoState: { categories },
	} = useVideo();
	const navigate = useNavigate();

	return (
		<form className="filter_section" onSubmit={(e) => e.preventDefault()}>
			<div className="filter_container">
				<button
					onClick={() => {
						filterDispatch({
							type: "CATEGORY",
							payload: "All",
						});
						navigate("/explore", { replace: true });
					}}
					className={`filter_button ${
						"All" === category ? "btn--primary" : "btn--outline--primary"
					}`}
				>
					All
				</button>
				{categories.length > 0
					? categories.map((categoryObj) => {
							return (
								<button
									onClick={() =>
										filterDispatch({
											type: "CATEGORY",
											payload: categoryObj.categoryId,
										})
									}
									className={`filter_button ${
										categoryObj.categoryId === category
											? "btn--primary"
											: "btn--outline--primary"
									}`}
									key={categoryObj._id}
								>
									{categoryObj.categoryName}
								</button>
							);
					  })
					: null}
				<button
					className={`filter_button sort_button ${
						byLatest === "unsort"
							? "btn--outline--primary"
							: byLatest
							? "btn--primary"
							: "btn--outline--primary"
					}`}
					onClick={() =>
						filterDispatch({
							type: "SORT_BY_DATE",
							payload:
								byLatest === true || !(byLatest === "unsort") ? "unsort" : true,
						})
					}
				>
					Sort by Latest
				</button>
				<button
					className={`filter_button sort_button ${
						!byLatest ? "btn--primary" : "btn--outline--primary"
					}`}
					onClick={() =>
						filterDispatch({
							type: "SORT_BY_DATE",
							payload: !byLatest ? "unsort" : false,
						})
					}
				>
					Sort by Oldest
				</button>
			</div>
		</form>
	);
};
