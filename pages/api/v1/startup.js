
import { createRouter } from 'next-connect';
import { onError, onNoMatch } from '../../../middleware/errorHandler';
import dbConnect from '../../../lib/dbConnect';

const router = createRouter();


router
	// .use(dateHandler)
	.get(async (req, res) => {

		await dbConnect();
		res.status(200).json({ msg: 'Mongodb started succesfully' });

	});


export default router.handler({
	onError,
	onNoMatch
});
