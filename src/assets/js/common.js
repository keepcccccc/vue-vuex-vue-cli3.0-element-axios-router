
import Vue from 'vue'
//mock数据
const api = 'https://easy-mock.com/mock/5d2d8a214b0b5451d8045dc7'
const img = 'https://dakang-images.beta.microzan.com.cn/ori/'

const rows = 10

function change(t){
    if (t < 10) {
      return "0" + t;
    } else {
      return t;
    }
  }
const timestampToTime=(timestamp,ss) => {
    if(!timestamp){
      return false
    }
    let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear();
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let D = change(date.getDate());
    let h = change(date.getHours());
    let m = change(date.getMinutes()) ;
    let s = change(date.getSeconds());
    if(ss == 'YMDHMS'){
      return Y + '-' + M  + '-' + D  + ' ' + h + ':' + m + ':' + s;
    }else if(ss == 'YMDHM'){
      return Y + '-' + M  + '-' + D  + ' ' + h + ':' + m;
    }
    return Y + '-' + M  + '-' + D;
  }
const giveType = ['','9赠3','18赠6']
const spec = ['','12.5mg','25mg']
const isFirst = ['','首次','二次']
const insto = ['','出库','入库','调整']
const status = {
  '0':'待审核',
  '1':'通过',
  '2':'驳回',
  '11':'线上待审核',
  '12':'线上驳回',
  '21':'回执待确认',
  '22':'回执驳回',
  '31':'完成'
}
const sex = ['','男','女']
const indication = ['','类风湿关节炎','强直性脊柱炎']

const loadRouter = (roleArr = [] ,router={})=>{ //动态加载路由
  let arr = []
  roleArr.map((item)=>{
    arr.push({
        path: '/'+item.path,
        name: item.path,
        component:resolve => require([`../../views/admin/${item.path}`], resolve),//动态生成路由(江湖人称懒加载,此步) 非常重要!!!
        meta: {
          title: item.name,
          requireAuth: item.requireAuth
        }
    })
  })
  //未定义路由重定向到logon页面
  arr.push({ 
    path:'*',
    redirect:'/'
  })
  router.addRoutes(arr)
}

const downExcel=(url='',data={},name='excel',method='POST')=>{ //导出
  let oReq = new XMLHttpRequest();        
      oReq.open(method, api+'/'+url, true);        
      oReq.responseType = "blob";       
       oReq.setRequestHeader("Content-Type","application/json");        
       oReq.onload = function (oEvent) {            
        var content = oReq.response;            
        var elink = document.createElement('a');            
        elink.download = name+'.xls';    
        elink.style.display = 'none';               
         var blob = new Blob([content], { type: 'application/vnd.ms-excel'}) 
         elink.href = URL.createObjectURL(blob);            
         document.body.appendChild(elink);            
         elink.click();            
         document.body.removeChild(elink);        
  };       
        oReq.send(JSON.stringify({...data}));
}

// 过滤器 start
Vue.filter('filterStatus', function(val1 = '0', val2 = '') { 
  return status[val1]
})
Vue.filter('timestampToTime', function(val1 = '0', val2 = '') { 
  return timestampToTime(val1,val2)
})
Vue.filter('sex', function(val1 = '0', val2 = '') { 
  return sex[val1]
})
Vue.filter('indication', function(val1 = '0', val2 = '') { 
  return indication[val1]
})
// 过滤器 end

export default  {   //导出
    api,
    rows,
    timestampToTime,
    isFirst,
    giveType,
    spec,
    status,
    sex,
    img,
    insto,
    indication,
    loadRouter,
    downExcel
}
