import _ from 'lodash';
// import Cookies from 'js-cookie';

function serializeParams(params){
  return _.chain(params).flatMap((val, key) => {
    return _.isNull(val) || _.isUndefined(val) ? '' : (() => {
      if(_.isArray(val)){
        return val.map(v => `${key}=${v}`);
      }
      return `${key}=${val}`;
    })();
  }).flattenDeep().value().filter(v => v !== '').join('&');
}

function isHeadOrGet(opts) {
  return  _.isUndefined(opts) ? false : (_.isUndefined(opts.method) || /^get|head$/i.test(opts.method) || (/^put$/i.test(opts.method) && !opts.contentType)) && !_.isUndefined(opts.body);
}
function getOpts(opts) {
  return isHeadOrGet(opts) ? _.chain(opts).omit('body').value() : (() => {
    return _.chain(opts).mapValues((val, key) => {
      if(key === 'body'){
        if(opts.contentType && opts.contentType === 'application/json'){
          return JSON.stringify(opts.body);
        }
        if(opts.contentType && opts.contentType === 'application/x-www-form-urlencoded' && /^put$/i.test(opts.method)){
          return serializeParams(opts.body);
        }
        var data = new FormData();
        _.forEach(val, (v, k) => {
          if(!_.isUndefined(v)) {
            data.append(k, v);
          }
        });
        return data;
      }
      return val;
    }).value();
  })();
}

function getUrl(url, opts) {
  return isHeadOrGet(opts) ? url + (/\?/.test(url) ? '&' : '?') + serializeParams(opts.body) : url;
}

function getHeaders(opts) {
  let myHeaders = new Headers();
  if(opts && opts.contentType === 'application/x-www-form-urlencoded'){
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  } else if (opts && opts.contentType === 'application/json'){
    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
  }

  // const token = Cookies.get('token') || '';
  // myHeaders.append("X-Authorization", 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlNTQ0N2VmNi01NjU1LTRlMDktYTYwYi05Y2MxNmQyNDAyNGYyMDM5MDkwMDAzIiwidWlkIjoiNDl1cmoxRDVKSnMwRG83ZXJIRllHZz09IiwiYmlkIjoibVdPTzdGMnpzTjBUd1JBeVFEbGsrQT09IiwiaXAiOiJneGdPRGdsdXdlMzJKaXpVU3BOY3F3PT0iLCJkZXYiOiJBOG9MTmVSVnZGR294TDlQWmVoa3BBPT0iLCJzdHMiOjAsImlhdCI6MTU4MTkxNTYyMiwiZXhwIjoxNTgxOTUxNjIyLCJpc3MiOiJ3Y3MifQ.xIN_zXzcmB-dWk2Wa1YN30zLf-Ow9vRPSEVmvF15TxM')
  // myHeaders.append("X-Authorization", token);
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, OPTIONS");
  myHeaders.append("Cache-Control", "no-cache");
  return {
    headers: myHeaders,
    mode: 'cors',
    credentials: 'include',
    cache: 'default'
  };
}

function fetchApi(url, options){
  var opts = Object.assign({}, getOpts(options), getHeaders(options));
  var myRequest = new Request(getUrl(url, options), opts);
  return fetch(myRequest).then((res) => {
    if(res.status >= 200 && res.status < 300){
      return res.json();
    }else{
      var error = new Error(res.statusText);
      error.response = res;
      return error;
    }
  });
}

export { fetchApi as fetch, fetchApi };


// fetch(`http://kangbo.io`,{
//   method:get post,
//   contentType:''
//   body:{
//     a:1,
//     b:2
//   }
// }).then((res)=>{

// })
