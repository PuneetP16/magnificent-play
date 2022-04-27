import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
	{
		_id: uuid(),
		categoryName: "Best Sixes",
		categoryId: 22,
	},
	{
		_id: uuid(),
		categoryName: "Best Yorkers",
		categoryId: 17,
	},
	{
		_id: uuid(),
		categoryName: "Best Catches",
		categoryId: 18,
	},
	{
		_id: uuid(),
		categoryName: "Funny Moments",
		categoryId: 24,
	},
];
