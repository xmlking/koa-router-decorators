'use strict';
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);
chai.config.includeStack = true;

export var expect = global.expect = chai.expect;
