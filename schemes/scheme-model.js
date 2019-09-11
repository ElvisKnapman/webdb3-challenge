const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps
};

function find() {
  return db("schemes").then(schemes => {
    return schemes;
  });
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first()
    .then(scheme => {
      return scheme;
    });
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
