const https = require('https');
const url = require('url');

const jisho = 'https://jisho.org/api/v1/search/words?keyword=';
/* 
 * jisho option keyword
 * option: 
 * en: English -> Japanese
 * ja: Japanese -> English
 * ps: parts of speech
*/

const keyword = process.argv[3];
const myURL = new URL(`${jisho}${keyword}`);

function pbcopy(data) {
	const proc = require('child_process').spawn('pbcopy');
	proc.stdin.write(data);
	proc.stdin.end();
}

function handler(body) {
	const option = process.argv[2];

	let callback;
	switch (option) {
		case 'ja': 
			const japaneseWord = body.data[0].japanese[0].word;
			const japaneseReading = body.data[0].japanese[0].reading;
			pbcopy(`${japaneseWord} (${japaneseReading})`);
			break;
		case 'en':
			const englishDefinitions = body.data[0].senses[0].english_definitions;
			callback = (a, b) => `${a}; ${b}`;
			pbcopy(englishDefinitions.reduce(callback, '').slice(2,));
			break;
		case 'ps':
			const partsOfSpeech = body.data[0].senses[0].parts_of_speech;
			callback = (a, b) => `${a}, ${b}`;
			pbcopy(partsOfSpeech.reduce(callback, '').slice(2,));
			break;
		default:
			console.log('Error: Invalid option');
		    pbcopy('');
	}
}

https.get(myURL, res => {
	res.setEncoding('utf8');
	let body = '';
	res.on('data', data => {
		body += data;
	});

	res.on('end', () => {
		body = JSON.parse(body);
		handler(body);
	});
});


