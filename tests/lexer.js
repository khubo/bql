import test from "tape";
import Lexer from "../lib/lexer.js";

test("generate identifier", function (t) {
  const lexer = new Lexer("gimme dude");
  let token = lexer.next();
  t.equal(token.type, "FIND");
  token = lexer.next();
  t.equal(token.type, "IDENTIFIER");
  t.end();
});

test("consume strings", function (t) {
  const lexer = new Lexer('gimme "dude"');
  let token = lexer.next();
  t.equal(token.type, "FIND");
  token = lexer.next();
  t.equal(token.type, "STRING");
  t.equal(token.value, "dude");
  t.end();
});

test("consume signs to", function (t) {
  const lexer = new Lexer(`=`);
  let token = lexer.next();
  t.equal(token.type, "ASSIGN");
  t.end();
});
