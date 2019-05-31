import axios from 'axios';
var store = require('store');
export const APIHost ='https://**********';
//不带token
var defaultParams = axios.create({
  timeout:1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  },
});
/**
 * HTTP GET
 * @param  {string} url
 * @return {Promise}
 */
export function read(url) {
  return axios(url, {
    ...defaultParams,
    method: 'get'
  });
}
/* HTTP POST */
export function create(url,body = {}) {
  return axios(url, {
    ...defaultParams,
    method: 'post',
    data:body
  });
}

/* HTTP PUT */
export function update(url, body = {}) {
  return axios(url, {
    ...defaultParams,
    method: 'put',
    data:body
  });
}

/* HTTP DELETE */
export function destroy(url) {
  return axios(url, {
    ...defaultParams,
    method: 'delete'
  });
}

/************************************* token **********************************/
/* HTTP GET */
export function read_Token(url) {
  defaultParams.headers = {
    Accept: 'application/json',
    'Content-Type':'application/json; charset=UTF-8',
    authToken:getAuth()
  };
  return axios(url, {
    ...defaultParams,
    method: 'get'
  });
}

export function creat_Token(url,body={}) {
  defaultParams.headers = {
    Accept: 'application/json',
    'Content-Type':'application/json; charset=UTF-8',
    authToken:getAuth()
  };
  return axios(url, {
    ...defaultParams,
    method: 'post',
    data: body
  });
}

export function delete_Token(url) {
  return axios(url, {
    ...defaultParams,
    method: 'delete'
  });
}

export function update_Token(url,token,body={}) {
  return axios(url, {
    ...defaultParams,
    method: 'put',
    data: body
  });
}
export function uploadImg_Token(url,body={}) {
  defaultParams.headers = {
    Accept: 'multipart/form-data',
    'Content-Type':'multipart/form-data; charset=UTF-8',
    authToken:getAuth()
  };
  return axios(url, {
    ...defaultParams,
    method: 'post',
    data: body,
  });
}
