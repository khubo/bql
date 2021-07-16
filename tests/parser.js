import test from "tape";
import Parser from "../lib/parser.js";
import Lexer from "../lib/lexer.js";

test("#find query", function (t) {
  const lexer = new Lexer(`gimme everything from users`);
  const parser = new Parser(lexer);
  const output = parser.parse();
  t.equal(output.type, "find");
  t.equal(output.collection, "users");
  t.end();
});

test("#find with limit", function (t) {
  const lexer = new Lexer(`gimme 5 docs from users`);
  const parser = new Parser(lexer);
  const output = parser.parse();
  t.equal(output.type, "find");
  t.equal(output.collection, "users");
  t.equal(output.limit, 5);
  t.end();
});

test("#find with sort", function (t) {
  const lexer = new Lexer(`gimme everything from users sorted by name`);
  const parser = new Parser(lexer);

  const output = parser.parse();

  t.equal(output.type, "find");
  t.equal(output.collection, "users");
  t.equal(output.sort, "name");
  t.end();
});
