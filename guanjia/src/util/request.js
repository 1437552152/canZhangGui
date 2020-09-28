/*
 * @Description: 
 * @Author: yfye
 * @Date: 2020-09-26 18:47:27
 * @LastEditTime: 2020-09-28 00:10:11
 * @LastEditors: yfye
 */
const url="http://3h4w437127.wicp.vip/"
export function postService(path, body, callback) {
  return new Promise((resolve, reject) => {
    fetch(`${url}${path}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':localStorage.getItem('setToken')
      },
      credentials: 'include',
      cache: 'default',
      body: JSON.stringify(body),
    }).then(function (response) {
      if (response.status === 200) {
        response.json().then((json) => {
           return callback && callback(json);
        });
      } else {
        return callback(response.status);
      }
      return response.json().then((json) => {
        callback && callback(json);
  
      });
    }).catch((error) => {
      reject(error);
    });


  });
}

export function getService(path, callback) {
  fetch(`${url}${path}`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':localStorage.getItem('setToken')
    },
  }).then(function (response) {
      if (response.status === 200) {
        response.json().then((json) => {
           return callback && callback(json);
        });
      } else {
        return callback(response.status);
      }
      return response.json().then((json) => {
        callback && callback(json);
      });
  }).catch((error) => {
    console.log(error);
  });
}


export function putService(path, body, callback) {
  fetch(`${url}${path}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':localStorage.getItem('setToken')
    },
    credentials: 'include',
    cache: 'default',
    body:JSON.stringify(body),
  }).then(function (response) {
    return response.json().then((json) => {
      callback && callback(json);

    });
  }).catch((error) => {
    console.log(error);
  });
}



export function deleteService(path, callback) {
  fetch(`${url}${path}`,  {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':localStorage.getItem('setToken')
    },
  }).then(function (response) {
    return response.json().then((json) => {
      callback && callback(json);
    });
  }).catch((error) => {
    console.log(error);
  });
}