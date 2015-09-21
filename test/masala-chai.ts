'use strict';
import chai = require('chai');
import sinon = require('sinon');
import sinonChai = require('sinon-chai');

chai.use(sinonChai);
chai.config.includeStack = true;

export default chai.expect;

