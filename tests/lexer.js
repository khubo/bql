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
