module.exports = function (knex) {
  
  return {
    getDbAnalysis: function (table, query, callback) {
    	var test = Object.keys(query)
    	console.log('select * from ' + table + ' where element="' + query[test] + '"', 'table and query')
      	knex.raw('select * from ' + table + ' where element="' + query[test] + '"')
      	.then(function (resp) {
      		console.log(resp, 'resp')
        	callback(null, resp)
      })
    },

    
  }
}