
import Product from '../models/Product';
import dbConnect from '../lib/dbConnect';

export const getAllProductsStatic = async (req, res) => {
	
	await dbConnect();
	const products = await Product.find({ }).sort('-name price');

	res.status(200).json({ products, nbHits: products.length });

};

export const getAllProducts = async (req, res) => {

	await dbConnect();

	const { 
		featured,
		company,
		name,
		sort,
		fields,
		numericFilters
	} = req.query;

	const queryObject = {};

	if (featured) {

		queryObject.featured = featured;

	}

	if (company) {

		queryObject.company = company;

	}

	if (name) {

		queryObject.name = { $regex: name, $options: 'i' };

	}

	if (numericFilters) {

		const operatorMap = {
			'<': '$lt',
			'<=': '$lte',
			'=': '$eq',
			'>': '$gt',
			'>=': '$gte'
		};

		const regEx = /\b(<|>|=|<=|>=)\b/g;
		const options = ['price', 'rating'];

		const filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);

		filters.split(',').forEach((item) => {

			const [field, operator, value] = item.split('-');

			if (options.includes(field)) {

				queryObject[field] = { [operator]: Number(value) };

			}

		});

	}

	let result = Product.find(queryObject);

	if (sort) {

		const sortList = sort.split(',').join(' ');
		result = result.sort(sortList);

	} else {

		result = result.sort('createdAt');

	}

	if (fields) {

		const fieldList = fields.split(',').join(' ');
		result = result.select(fieldList);

	}

	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	result = result.skip(skip).limit(limit);

	const products = await result;

	res.status(200).json({ products, nbHits: products.length });

};

