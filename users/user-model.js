const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove
}

async function find() {
    try {
        return await db('users');
    } catch (error) {
        throw error;
    }
}

function findBy(filter) {
    return db("users as u")
      .select("u.id", "u.username", "u.password")
      .where(filter).orderBy("u.id");
  }
  
  function findById(id) {
    return db("users").where({ id }).first();
  }

async function add(userData) {
    try {
        const ids = await db('users').insert(userData);
        const newUser = await findById(ids[0]);
        return newUser;
    } catch (error) {
        throw error;
    }
}

async function update(id, changes) {
    try {
        await db('users').where({ id }).update(changes);
        return await findById(id);
    } catch (error) {
        throw error;
    }
}

async function remove(id) {
    try {
        return await db('users').del().where({ id });
    } catch (error) {
        throw error;
    }
}