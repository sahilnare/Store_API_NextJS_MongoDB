
import { createRouter } from 'next-connect';
import { onError, onNoMatch } from '../../../../middleware/errorHandler';
import populate from '../../../../lib/dbPopulate';

const router = createRouter();


router
	// .use(dateHandler)
	.get(async (req, res) => {

		await populate();
		res.status(200).send('Populated!');

	});


export default router.handler({
	onError,
	onNoMatch
});
