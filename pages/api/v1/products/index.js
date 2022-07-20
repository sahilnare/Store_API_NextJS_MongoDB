
import { createRouter } from 'next-connect';
import { onError, onNoMatch } from '../../../../middleware/errorHandler';
import { getAllProducts } from '../../../../controllers/products';

const router = createRouter();


router
	// .use(dateHandler)
	.get(getAllProducts);


export default router.handler({
	onError,
	onNoMatch
});
