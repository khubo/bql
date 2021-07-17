import Lexer, { tokens } from "./lexer.js";

class Parser {
  constructor(lexer) {
    this.lexer = lexer;
    this.currentToken = lexer.next();
    this.previousToken = null;
  }

  _raise(error) {
    console.error(`parse error: `, error);
  }

  eat(tokenType) {
    if (this.currentToken.type == tokenType) {
      this.previousToken = this.currentToken;
      this.currentToken = this.lexer.next();
    } else {
      this._raise(`expected ${tokenType}, got ${this.currentToken.type}`);
    }
  }

  find() {
    const queryObj = {
      type: "find",
    };
    this.eat(tokens.gimme);

    if (this.currentToken.type === tokens.everything) {
      this.eat(tokens.everything);
    } else {
      // selecting only a limited set of docs.
      const count = this.currentToken.value;
      this.eat(tokens.integer);
      queryObj.limit = count;
      this.eat(tokens.docs);
    }

    // get the collection name
    this.eat(tokens.from);
    this.eat(tokens.identifier);
    queryObj.collection = this.previousToken.value;

    // check if sorting needs to be done
    if (this.currentToken.type === tokens.sorted) {
      this.eat(tokens.sorted);
      this.eat(tokens.by);
      queryObj.sort = this.currentToken.value;
      this.eat(tokens.identifier);
    }

    return queryObj;
  }

  insert() {
    const queryObj = {
      type: "insert",
    };

    this.eat(tokens.add);
    this.eat(tokens.to);
    this.eat(tokens.identifier);
    queryObj.collection = this.previousToken.value;

    const data = {};
    while (this.currentToken.type === tokens.identifier) {
      this.eat(tokens.identifier);
      const key = this.previousToken.value.toLowerCase();
      this.eat(tokens.assign);
      const value = this.currentToken.value;
      this.eat(tokens.string);
      data[key] = value;
    }
    queryObj.data = data;
    return queryObj;
  }

  parse() {
    if (this.currentToken.type == tokens.gimme) {
      return this.find();
    }

    if (this.currentToken.type === tokens.add) {
      return this.insert();
    }

    this._raise(`unrecognized query`);
  }
}

export default Parser;
