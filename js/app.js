const fetchSteam = async () => 
{
	const url = 'https://games-details.p.rapidapi.com/gameinfo/single_game/730';
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '0125ddbecfmsh76a100fd69cb6f8p176878jsn171261301bb3',
			'x-rapidapi-host': 'games-details.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log('Resultados:' ,result);
	} catch (error) {
		console.error(error);
	}	
}

fetchSteam();