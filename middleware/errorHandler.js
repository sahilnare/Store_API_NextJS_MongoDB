

export function onNoMatch(req, res) {

	console.error('Not Found');
	
	res.status(404).json({ msg: 'Page not found' });

}

export function onError(err, req, res) {

	console.error(err);
  
	res.status(500).json({ msg: 'Something went wrong' });

}

