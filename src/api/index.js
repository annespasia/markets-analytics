import request from '@/utils/request'

export function getTopVolume(){
  return request({
    url: "/topVolume",
    method: "get",
    // params: { token }
  })
}

export function getStocks(stock,startDate,endDate){
  return request({
    url: "/stocks",
    method: "get",
    params: { name:stock,startDate,endDate }
  })
}