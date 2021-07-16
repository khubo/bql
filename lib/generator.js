import Parser from "./parser.js";

class Generator {
  constructor(queryObj, db) {
    this.query = queryObj;
    this.db = db || {};
  }

  find() {
    let query = this.db.collection(this.query.collection).find({});
    // query has a limit set
    if (this.query.limit) {
      query = query.limit(this.query.limit);
    }

    if (this.query.sort) {
      query = query.sort(this.query.sort);
    }
    return query.toArray();
  }

  createMongoQuery() {
    if (this.query.type == "find") {
      return this.find();
    }
  }
}

export default Generator;
