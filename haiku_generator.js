var fs = require("fs");
var cmuDictFile = readCMUdictFile("./cmudict.txt");

function readCMUdictFile(file) {
	return fs.readFileSync(file).toString();
}

function formatData(data) {
	var lines = data.toString().split("\n");
	var lineSplit;
	var dictionary = {};
	var syllablesArr = [];
	lines.forEach(function(line) {
		lineSplit = line.split("  ");
		var word = lineSplit[0];
		var phonemes = lineSplit[1];
		var syll = countSyll(phonemes);
		if (word.search(/^\D+$/)>-1) {
			if (syllablesArr[syll] === undefined) syllablesArr[syll] = [word];
			else syllablesArr[syll].push(word);
		}
	});
	return syllablesArr;
}

function countSyll(phonemes) {
	if (phonemes !==undefined) return phonemes.split(/\d/).length-1;
}

var dictionary = formatData(cmuDictFile);

function createHaiku(structure, syllArr) {
	return structure.map(function(line) {
		return line.map(function(word) {
			var select = syllArr[word][randomize(0, syllArr[word].length-1)];
			return select;
		}).join(" ");
	}).join("\n");
}

function randomize(min, max) {
	return Math.round(Math.random()*(max-min))+min;
}

function randWords(num) {
	var arr = [];
	while (num > 0) { 
		var add = randomize(1, num);
		arr.push(add);
		num -= add;
	}
	return arr;
}

function create(arr) {
	var structure=[];
	arr.forEach(function(line) {
		structure.push(randWords(line));
	})
	return createHaiku(structure, dictionary);
}

module.exports = {
	create: create,
};