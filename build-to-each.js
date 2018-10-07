const fs = require('fs')
const cson = require('cson')
const { forEach, map } = require('lodash')

// toAtom()
// fromAtom()

function toAtom() {
  const list1 = cson.load('./db-raw.cson')
  // console.log(list1)
  const rs1 = {}
  list1.forEach(({ scopeList, snippetList }) => {
    scopeList.forEach(scope => {
      snippetList.forEach(({ name, trigger, content, desc }) => {
        rs1[scope] = rs1[scope] || {}
        rs1[scope][name] = {
          prefix: trigger,
          body: content,
        }
      })
    })
  })
  const rs2 = cson.createCSONString(rs1, {
    indent: '  ',
  })
  // fs.writeFileSync('db-raw-to-atom.cson', rs2)
  fs.writeFileSync('/Users/hisland/.atom/snippets.cson', rs2)
}

function fromAtom() {
  const atomOrg = cson.load('/Users/hisland/.atom/snippets.cson')
  // const rs1 = []
  // forEach(atomOrg, (vv1, scope) => {
  //   const oneScope = {
  //     scopeList: [scope],
  //     snippetList: [],
  //   }
  //   oneScope.snippetList = map(vv1, ({ prefix, body }, name) => ({
  //     name,
  //     trigger: prefix,
  //     content: body,
  //     desc: '',
  //   }))
  //
  //   rs1.push(oneScope)
  // })
  const rs1 = map(atomOrg, (vv1, scope) => ({
    scopeList: [scope],
    snippetList: map(vv1, ({ prefix, body }, name) => ({
      name,
      trigger: prefix,
      content: body,
      desc: '',
    })),
  }))
  const rs2 = cson.createCSONString(rs1, {
    indent: '  ',
  })
  fs.writeFileSync('db-from-atom.cson', rs2)
}

function toVSCode() {}

function toSublimeText3() {}
