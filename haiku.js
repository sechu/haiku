var haiku = require('./haiku_generator');
var num = (+process.argv[2] || 1);

for (var i = 1; i < num+1; i++) {
	console.log("\nHaiku #"+i+":");
	console.log(haiku.create([5,7,5]));
}
