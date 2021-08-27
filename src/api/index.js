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

export function getSortedStocks(data){
  return request({
    url: "/sortStocks",
    method: "get",
    params: data
    // params:{name:"AAPL",startDate:"2009-01-01",endDate:"2015-12-31"}
  })
}

export function getFilteredStocks(data){
  return request({
    url: "/filer",
    method: "get",
    params: data
  })
}

export function getAggStocks(data){
  const {name,by,startDate,endDate}=data
  return request({
    url: "/aggStocks/"+name,
    method: "get",
    params: {by,startDate,endDate}
  })
}