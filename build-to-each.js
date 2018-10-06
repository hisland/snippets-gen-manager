const cson = require('cson')
const _ = require('lodash')

// const db = require('./db.js');

const list1 = cson.load('./db.cson')

console.log(list1)

function toAtom() {}
function toVSCode() {}
function toSublimeText3() {}
