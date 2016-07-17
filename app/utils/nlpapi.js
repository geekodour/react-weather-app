var googleapi = require('./googleapi');
var nlp = require('nlp_compromise');
var wordScore = require('./myjson.js');

var mydata = [];

function scoreCalc(wordsArray){
	
	let score = 0;	
	wordsArray.forEach(function(current){
		if(current in wordScore){
			score = score + parseInt(wordScore[current]);
		} //end of if block
	})	
	return score;
}


function giveScore(){
	googleapi.getNews()
		.then(function(data){
			var count = 0;
		data.map(function(countryNews){
				let words = [];
				let countryName = countryNews.countryName;
				let countryNewsHTML = countryNews.newsHTML;
				countryNews.newsTitles.forEach( function(element, index) {
					let nouns = nlp.sentence(element.title).nouns();
					let verbs = nlp.sentence(element.title).verbs();
					let adjectives = nlp.sentence(element.title).adjectives();
					//FILTERS 
					verbs = verbs.filter(function(verb){
						return verb.tag != "Copula"
					}); //END OF VERB FILTER


					//FILTERS END
					nouns = nouns.map(function(noun){
						return noun.text;
					}); //END OF NOUN MAP
					verbs = verbs.map(function(verb){
						return verb.text;
					}); //END OF VERB MAP
					adjectives = adjectives.map(function(adjective) {
						return adjective.text;
					});
					//CONCAT VERB AND NOUN
					let tempWords = verbs.concat(nouns,adjectives);
					words = words.concat(tempWords);
				}); //END OF FOR EACH
				let score = scoreCalc(words);
				console.log(count+=1,":: ",countryName," : ",score,"AND THE WORDS: ",words)
			//	return words;
			}); //END OF MAP AFTER THEN
		})
		return 
}

var nlphelpers = {
	logNews : giveScore 
}


module.exports = nlphelpers ;