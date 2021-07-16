import readLine from "readline-sync";
import { MongoClient } from "mongodb";
import Parser from "./lib/parser.js";
import Lexer from "./lib/lexer.js";
import Generator from "./lib/generator.js";

(async () => {
  try {
    // check for mongo uri
    const uri = process.argv[2] || "mongodb://localhost:27017";

    const client = new MongoClient(uri);
    await client.connect();
    const dbName = "admin"; //TODO: hardcoded for
    const db = client.db(dbName);

    while (true) {
      const line = await readLine.question(">> ");
      const queryObj = new Parser(new Lexer(line)).parse();

      if (queryObj) {
        const generator = new Generator(queryObj, db);
        const result = await generator.createMongoQuery();
        if (Array.isArray(result)) {
          console.table(result);
        } else {
          console.log(result);
        }
      }
    }
  } catch (e) {
    console.error("error: ");
    console.error(e);
  }
})();
