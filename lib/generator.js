import Parser from "./parser.js";

class Generator {
  constructor(queryObj, db) {
    this.query = queryObj;
    this.db = db || {};
  }

  // construct find query
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

  // construct insert query
  // insert individual documents.
  async insert() {
    await this.db.collection(this.query.collection).insertOne(this.query.data);
    return "done";
  }

  createMongoQuery() {
    // invoke the helper function based on the query involved
    if (this.query.type == "find") {
      return this.find();
    }

    if (this.query.type == "insert") {
      return this.insert();
    }
  }
}

export default Generator;
