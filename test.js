const fs = require('fs')
const path = require('path')
const list = require('./map.json')
const axios = require('axios')

const setFile = (bookName, detailName) => {
    console.log(bookName,)
    if (fs.existsSync('E:/地图/' + bookName)) {
    } else {
        fs.mkdirSync('E:/地图/' + bookName)
    }
    return path.resolve(__dirname, `E:/地图/${bookName}/${detailName}`)
}

const getName = (id) => {
    const area = list.find(item => item.adcode === id)
    return area? area.name:'中华人民共和国'
}

const loadData = () => {
    list.forEach(item => {
        axios.get('https://geo.datav.aliyun.com/areas_v3/bound/' + item.adcode + '.json').then(res => {
            fs.writeFile(setFile(getName(item.parent) + '', `${item.name}.json`), JSON.stringify(res.data), function (err) {
                console.log('------->', `${item.name}.json`, err)
            })
        })
    })
}


loadData()





