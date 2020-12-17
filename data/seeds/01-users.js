

exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {id: 1, firstname:'John', lastname:"Apple", username: 'Japple',password:'passapple', email:'email@email.com' },
    {id: 2,  firstname:'Larry', lastname:"Orange", username: 'Lorange',password:'passapple', email:'test@email.com'  },
  ]);
};
