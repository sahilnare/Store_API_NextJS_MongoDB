
import dbConnect from './dbConnect';
import Product from '../models/Product';
import jsonProducts from './products.json';



const populate = async () => {

	try {

		await dbConnect();
		await Product.deleteMany({});
		await Product.create(jsonProducts);
		console.log('Success!');
		return;
		
	} catch (error) {

		console.log(error);
		
	}

};

export default populate;
