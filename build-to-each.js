const fs = require('fs')
const cson = require('cson')
const { forEach, map } = require('lodash')

// toAtom()
toVSCode()
// toSublimeText3()
// fromAtom()
// selfRebuild1()
// selfRebuild2()

function toAtom() {
  const list1 = cson.load('./db-raw.cson')
  // console.log(list1)
  const rs1 = {}
  list1.forEach(({ scopeList, snippetList }) => {
    scopeList.forEach(({ atomScope, vscodeScope }) => {
      snippetList.forEach(({ name, trigger, content, desc }) => {
        rs1[atomScope] = rs1[atomScope] || {}
        rs1[atomScope][name] = {
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
  console.log('write to VSCode')
  const list1 = cson.load('./db-raw.cson')
  // console.log(list1)
  const rs1 = {}
  list1.forEach(({ scopeList, snippetList }) => {
    snippetList.forEach(({ name, trigger, content, desc }) => {
      rs1[name] = {
        prefix: trigger,
        scope: scopeList.map((vv) => vv.vscodeScope).join(','),
        body: [content],
        description: desc,
      }
    })
  })
  const rs2 = JSON.stringify(rs1, null, '  ')
  // fs.writeFileSync('./out-db-raw-to-vscode.cson', rs2)
  const out_path =
    '/Users/hisland/Library/Application Support/Code/User/snippets/hdl.code-snippets'
  fs.writeFileSync(out_path, rs2)
  console.log('write to: ', out_path)
}

function toSublimeText3() {
  const cs_code_cfg_path =
    '/Users/hisland/Library/Application Support/Sublime Text 3/Packages/User'
}

function selfRebuild2() {
  const list1 = cson.load('./db-raw.cson')
  const fileMap = {
    '.source.js': 'javascript',
    '.source.ts': 'typescript',
    '.text.html': 'html',
    '.source.pug': 'jade',
    '.source.css': 'css,scss',
  }
  list1.forEach(({ scopeList, snippetList }, ii, oo) => {
    oo[ii].scopeList = scopeList.map(({ atomScope, vscodeScope }) => {
      if (!fileMap[atomScope]) {
        console.log('unknownType: ', atomScope)
      }
      return {
        atomScope: atomScope,
        vscodeScope: fileMap[atomScope],
      }
    })
  })
  const rs2 = cson.createCSONString(list1, {
    indent: '  ',
  })
  const out_path = './db-raw.cson'
  fs.writeFileSync(out_path, rs2)
  console.log('write to: ', out_path)
}

function selfRebuild1() {
  const list1 = cson.load('./db-raw.cson')
  const fileMap = {
    '.source.js': 'javascript',
    '.source.ts': 'typescript',
    '.text.html': 'html',
    '.source.pug': 'jade',
    '.source.css': 'css',
  }
  list1.forEach(({ scopeList, snippetList }, ii, oo) => {
    oo[ii].scopeList = scopeList.map((scope) => {
      if (!fileMap[scope]) {
        console.log('unknownType: ', scope)
      }
      return {
        atomScope: scope,
        vscodeScope: fileMap[scope],
      }
    })
  })
  const rs2 = cson.createCSONString(list1, {
    indent: '  ',
  })
  const out_path = './db-raw.cson'
  fs.writeFileSync(out_path, rs2)
  console.log('write to: ', out_path)
}
