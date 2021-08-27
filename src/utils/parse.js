// const MarkdownIt = require('markdown-it')
// const mk=require('markdown-it-katex')
// const mk = require('@area403/markdown-it-mathjax')

// import { sort } from "core-js/core/array";

export function parseData(data){
  let parsed=[]
  for (let elem of data){
    let date,open,high,low,close,volume;
    ({date,open,high,low,close,volume}=elem)
    let elem_=[date,parseFloat(open),parseFloat(close),parseFloat(low),parseFloat(high),parseFloat(volume)]
    // parseDate(date)
    // let unit=Object.values(elem_)
    parsed.push(elem_)
    // console.log(elem,elem_)
  }
  parsed=parsed.sort((a, b)=> {
    // Compare the 2 dates
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
  });
  return parsed
}

export function parseDate(date){
  let timeStamp;
  timeStamp=Date.parse(new Date(date))
  return timeStamp
}

// export function parseMD(str){
//   let md = require('markdown-it')()
//   md.use(mk);
//   // str=`# Math Rulez!\n\n$\\sqrt{3x-1}+(1+x)^2$`
//   // str=`$a\times b$`
//   // str=`&emsp; 罗老师有一台神奇的复读机，你说什么它就会原封不动的重复一遍，作为集训队的灵魂领袖，他希望你写一个复读程序。\nLaTeX测试 $a \\times b$`
//   let result = md.render(str);
//   // console.log(typeof str)
//   // console.log(typeof result)
//   return result
// }

export function parseTimestamp(time){
  // time+=new Date()
  if (time){
    let date=new Date(time*1000+8*3600*1000)
    // console.log(date.toJSON())
    return date.toJSON().substring(0,19).replace('T',' ')
  } else {
    return null
  }
}

export function countTags(tags){
  let tagsParsed = []; 
  let temp={}
  try {
    for(let i= 0; i < tags.length; i++){ 
      let item = tags[i]; 
      temp[item] = (temp[item] +1 ) || 1; 
    }
    for (let item in temp){
      tagsParsed.push({name:item,count:temp[item]})
    }
    return tagsParsed;
  } catch (error) {
    return error
  }
  
}

export function parseTags(tags){
  let result=null
  const LEN=10
  tags=tags.length>=LEN?tags.slice(LEN):tags
  result=countTags(tags)
  return new Promise((resolve,reject)=>{
    if (result) {
      resolve(result)
    } else {
      reject(result)
    }
  })
}