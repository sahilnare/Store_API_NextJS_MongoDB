
import { createRouter } from 'next-connect';
import { onError, onNoMatch } from '../../../../middleware/errorHandler';
import { getAllProductsStatic } from '../../../../controllers/products';

const router = createRouter();


router
	// .use(dateHandler)
	.get(getAllProductsStatic);


export default router.handler({
	onError,
	onNoMatch
});
