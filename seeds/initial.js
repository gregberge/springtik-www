exports.seed = (knex, Promise) =>
  Promise.join(
    knex('users')
      .where('id', 1)
      .del(),
    knex('users').insert({
      id: 1,
      email: 'admin@springtik.fr',
      password: '$2a$08$eUqe.Sic2FQOUIOo8XWrDOpiZE4rukM9oI27GtZv/SdMKIUIFiN/e',
      updatedAt: new Date(),
      createdAt: new Date()
    })
  );
