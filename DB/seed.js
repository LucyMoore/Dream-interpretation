exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('dreams').del(), 

    // Inserts seed entries
    knex('dreams').insert({element: "abbey", analysis: 'we come across an Abbey in our dreams suggest that we are looking to find inner peace and to clean up old habits'}),
    knex('dreams').insert({element: "abdomen", analysis: 'People who dream about being abducted wake up feeling like they had a horrible nightmare.  These types of dreams mean that somebody close to you in your life is controlling your every move.  You need to be more assertive in life and try and not be run over'}),
    knex('dreams').insert({element: "abduction", analysis: 'represents your gut feeling on a situation.  This is a interesting dream symbol because it represents your intuitive human instincts in your walking life.  There is someone or something you cant seem to stomach.'}),
    knex('dreams').insert({element: "test", analysis: 'test analysis'}),
    knex('dreams').insert({element: "coding", analysis: 'on of us, one of us...'})
  );
};



  