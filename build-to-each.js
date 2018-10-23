const fs = require('fs')
const cson = require('cson')
const { forEach, map } = require('lodash')

toAtom()
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
  // fs.writeFileSync('./out-db-raw-to-atom.cson', rs2)
  const out_path = '/Users/hisland/.atom/snippets.cson'
  fs.writeFileSync(out_path, rs2)
  console.log('write to: ', out_path)
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
  const out_path = 'gen-db-from-atom.cson'
  fs.writeFileSync(out_path, rs2)
  console.log('write to: ', out_path)
}

function toVSCode() {
  const cs_code_cfg_path =
    '/Users/hisland/Library/Application Support/Code/User'
  const p2 = '/Users/hisland/.vscode/extensions'
}

function toSublimeText3() {
  const cs_code_cfg_path =
    '/Users/hisland/Library/Application Support/Sublime Text 3/Packages/User'
}
