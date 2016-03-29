
exports.up = function(knex, Promise) {
	return knex.schema.createTableIfNotExists('dreams', function(table){
		table.string('element')
		table.string('analysis')
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('dreams').then(function(){
		console.log('dreams table dropped')
	})
  
};
