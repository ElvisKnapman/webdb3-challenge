const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("schemes").then(schemes => {
    return schemes;
  });
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
  return db("schemes")
    .join("steps", "steps.scheme_id", "=", "schemes.id")
    .select(
      "steps.id",
      "schemes.scheme_name",
      "steps.step_number",
      "steps.instructions"
    )
    .where({ scheme_id: id })
    .orderBy("steps.step_number", "asc");
}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(([id]) => {
      return findById(id);
    });
}

function update(changes, id) {
  return db("schemes")
    .update(changes)
    .where({ id })
    .then(result => {
      console.log("THE RESULT", result);
      return findById(id);
    });
}

function remove(id) {
  let scheme = null;
  findById(id).then(result => {
    scheme = result;
  });
  return db("schemes")
    .where({ id })
    .del()
    .then(result => {
      if (result) {
        return scheme;
      } else {
        return null;
      }
    });
}
