import { isAlphabet, isAlphaNumeric } from "./utils.js";

export const tokens = {
  gimme: "FIND",
  everything: "ALL",
  from: "FROM",
  integer: "INTEGER",
  number: "NUMBER",
  identifier: "IDENTIFIER",
  eof: "EOF",
  docs: "DOCUMENT",
  sorted: "SORT",
  by: "BY",
  add: "ADD",
  to: "TO",
  string: "STRING",
  assign: "ASSIGN",
};

const keyWords = [
  "gimme",
  "everything",
  "from",
  "docs",
  "sorted",
  "by",
  "add",
  "to",
];

// token object
class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

// the lexer class
class Lexer {
  constructor(input) {
    this.input = input;
    this.currenToken = 0;
    this.pos = 0;
  }

  // remove the white spaces between tokens
  skipWhiteSpace() {
    // the query is over.. aaaaah!
    if (this.pos >= this.input.length) return;

    // eat away all the white spaces
    while (/\s/.test(this.input[this.pos])) {
      this.pos++;
    }
  }

  _raise(message) {
    console.error("error parsing token", message);
  }

  // can either be a keyword or a variable
  createIdenifier() {
    let start = this.pos;
    while (isAlphaNumeric(this.input[this.pos])) {
      this.pos++;
    }

    // keywords and identifiers should be case insensitive
    const text = this.input.substring(start, this.pos).toLowerCase();

    return keyWords.includes(text)
      ? new Token(tokens[text], text)
      : new Token(tokens.identifier, text);
  }

  createInteger() {
    let start = this.pos;
    while (!isNaN(this.input[this.pos])) {
      this.pos++;
    }
    const number = this.input.substring(start, this.pos);
    return new Token(tokens.integer, parseInt(number, 10));
  }

  // string in the query
  // data being input by the user for instance.
  createString() {
    let start = ++this.pos;
    while (isAlphaNumeric(this.input[this.pos])) {
      this.pos++;
    }

    const text = this.input.substring(start, this.pos);
    this.pos++;
    return new Token(tokens.string, text);
  }

  // return the next token
  next() {
    this.skipWhiteSpace();

    if (this.pos >= this.input.length) {
      return new Token(tokens.eof);
    }

    if (isAlphabet(this.input[this.pos])) {
      return this.createIdenifier();
    }

    if (!isNaN(this.input[this.pos])) {
      return this.createInteger();
    }

    // collect the string
    if (this.input[this.pos] === '"') {
      return this.createString();
    }

    // assign operation
    if (this.input[this.pos] === "=") {
      this.pos++;
      return new Token(tokens.assign, "=");
    }

    this._raise("invalid token", this.input[this.pos]);
  }
}

export default Lexer;
