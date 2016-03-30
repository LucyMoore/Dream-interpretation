module.exports = function (knex) {
  
  return {
    getDbAnalysis: function (table, query, callback) {
    	var searchParams = Object.keys(query)
      	knex.raw('select * from ' + table + ' where element="' + query[searchParams] + '"')
      	.then(function (resp) {
        	callback(null, resp)
      })
    },

    getDbAll: function (callback){
    	knex.raw('SELECT * FROM dreams')
    	.then(function(resp){
    		callback(null, resp)
    	})
    }

  }
}
