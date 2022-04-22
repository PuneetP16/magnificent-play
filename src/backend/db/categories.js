import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
	{
		_id: uuid(),
		categoryName: "Best Sixes",
	},
	{
		_id: uuid(),
		categoryName: "Best Yorkers",
	},
	{
		_id: uuid(),
		categoryName: "Best Catches",
	},
	{
		_id: uuid(),
		categoryName: "Funny Moments",
	},
];
