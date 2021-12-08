/**
 * create by zhangxiang on 2021-12-05 12:31
 * 类注释：
 * 备注：
 */

const mysql = require('mysql')

const con = mysql.createConnection({
    host: '150.158.52.240',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'book'
})

con.connect(err => {
    if (err) {
        console.log('链接失败', err)
    } else {
        console.log('链接成功')
    }
})

const execute = (sql) => {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(JSON.parse(JSON.stringify(result)))
        })
    })
}

module.exports = {
    execute
}

