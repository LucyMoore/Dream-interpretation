module.exports = function (knex) {
  
  return {
    getDbAnalysis: function (table, query, callback) {
    	var test = Object.keys(query)
      	knex.raw('select * from ' + table + ' where element="' + query[test] + '"')
      	.then(function (resp) {
        	callback(null, resp)
      })
    },

    

    
  }
}
//[ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']