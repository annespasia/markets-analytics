import request from '@/utils/request'

export function getTopVolume(){
  return request({
    url: "/topVolume",
    method: "get",
    // params: { token }
  })
}

export function getStocks(data){
  return request({
    url: "/stocks",
    method: "get",
    params: data
    // params:{name:"AAPL",startDate:"2009-01-01",endDate:"2015-12-31"}
  })
}