var arr = [
  {
    "id": 100001,
    "name": "费用类别1",
    "type": 1,
    "parentId": 0,
    "level": 1
  },
  {
    "id": 100002,
    "name": "费用类别2",
    "type": 1,
    "parentId": 0,
    "level": 1
  },
  {
    "id": 100004,
    "name": "费用类别4",
    "type": 1,
    "parentId": 100001,
    "level": 2
  },
  {
    "id": 1,
    "name": "费用类型1",
    "type": 2,
    "parentId": 100001,
    "message": "提示文案",
    "level": 2,
  },
  {
    "id": 100003,
    "name": "费用类别3",
    "type": 1,
    "parentId": 100002,
    "level": 2
  },
  {
    "id": 100006,
    "name": "费用类别6",
    "type": 1,
    "parentId": 100003,
    "level": 3
  },
  {
    "id": 100007,
    "name": "费用类别7",
    "type": 1,
    "parentId": 100006,
    "level": 4
  },
  {
    "id": 2,
    "name": "费用类型2",
    "type": 2,
    "parentId": 100007,
    "message": "提示文案",
    "level": 5
  }
]

function find(arr, id, value) {
  if(!Array.isArray(arr)) return null
  arr.forEach(item => {
    if(item.id===+id){
       item.children = value
       return
    }
    if(item.children) {
      return find(item.children, id, value)
    }
    
  })
}

function array2list (arr) {
 // 分组
  const map = arr.reduce((total,curr) => {
    const key = `${curr.parentId}`
    if(!total[key]){
      total[key] = []
    }
    total[key].push(curr)
    return total
  }, {})
  console.log("====", map)

//  生成树
  const result =map[0]
  Object.keys(map).forEach(k => {
    find(result, k, map[k])
  })
  console.log(JSON.stringify(result, null, 4))
}
array2list(arr)


var list = [
    {
        "id": 100001,
        "name": "费用类别1",
        "type": 1,
        "parentId": 0,
        "level": 1,
        "children": [
            {
                "id": 100004,
                "name": "费用类别4",
                "type": 1,
                "parentId": 100001,
                "level": 2
            },
            {
                "id": 1,
                "name": "费用类型1",
                "type": 2,
                "parentId": 100001,
                "message": "提示文案",
                "level": 2
            }
        ]
    },
    {
        "id": 100002,
        "name": "费用类别2",
        "type": 1,
        "parentId": 0,
        "level": 1,
        "children": [
            {
                "id": 100003,
                "name": "费用类别3",
                "type": 1,
                "parentId": 100002,
                "level": 2,
                "children": [
                    {
                        "id": 100006,
                        "name": "费用类别6",
                        "type": 1,
                        "parentId": 100003,
                        "level": 3,
                        "children": [
                            {
                                "id": 100007,
                                "name": "费用类别7",
                                "type": 1,
                                "parentId": 100006,
                                "level": 4,
                                "children": [
                                    {
                                        "id": 2,
                                        "name": "费用类型2",
                                        "type": 2,
                                        "parentId": 100007,
                                        "message": "提示文案",
                                        "level": 5
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

function flat (list, total) {
 const map = list.reduce((total, curr) => {
    const {children, id} = curr
    // if()
    total[rest.id] = curr
    if(children) {
      flat (children, total)
    }
  }, {})
  return total.concat(map)
}
function list2array(list) {
  const result = flat (list, [])
  console.log('==list2array===',result)
}
list2array(list)