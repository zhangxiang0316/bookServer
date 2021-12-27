const axios =require('axios')

function getData(){
  axios.get('http://quanben-xiaoshuo.com/').then(res=>{
    console.log(res)
  })
}

getData()



