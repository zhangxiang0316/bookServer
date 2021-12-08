const {execute} = require('../db/mysql')

const getBookList = async () => {
    const sql = `select * from book`
    return await execute(sql)
}

const getBookDetail = async (detailUrl) => {
    if (detailUrl) {
        const sql = `select * from detail where detailUrl = '${detailUrl}'`
        const list = await execute(sql)
        return list[0]
    } else {
        return {}
    }
}
const getBookDetailList = async (menuUrl) => {
    if (menuUrl) {
        const sql = `select menuUrl,title,nextUrl from detail where menuUrl = '${menuUrl}' ORDER BY title`
        return  await execute(sql)
    } else {
        return []
    }
}


module.exports = {
    getBookList,
    getBookDetail,
    getBookDetailList
}