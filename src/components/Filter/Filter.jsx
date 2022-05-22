import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterAction } from "../../store/filterSlice";
import "./Filter.css";

export const Filter = () => {
	const { category, byLatest } = useSelector((state) => state.filter);
	const { categories } = useSelector((state) => state.videos);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	return (
		<form className="filter_section" onSubmit={(e) => e.preventDefault()}>
			<div className="filter_container">
				<button
					onClick={() => {
						dispatch(filterAction.filterByCategory("All"));
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
										dispatch(
											filterAction.filterByCategory(categoryObj.categoryId)
										)
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
						dispatch(
							filterAction.sortByDate(
								byLatest === true || !(byLatest === "unsort") ? "unsort" : true
							)
						)
					}
				>
					Sort by Latest
				</button>
				<button
					className={`filter_button sort_button ${
						!byLatest ? "btn--primary" : "btn--outline--primary"
					}`}
					onClick={() =>
						dispatch(filterAction.sortByDate(!byLatest ? "unsort" : false))
					}
				>
					Sort by Oldest
				</button>
			</div>
		</form>
	);
};
