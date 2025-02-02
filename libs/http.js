import { getAccessToken, getRefreshToken, logout, tokenRefresh } from '@/apis/auth';
import axios from 'axios';
import { get, isEmpty } from 'lodash';
import { isExpires } from './token';
import { signOut } from 'next-auth/react';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

const promiseList = [];

http.interceptors.request.use(
  async function (config) {
    const isExpired = isExpires(getAccessToken());
    // 토큰 만료인경우
    if (isExpired && isEmpty(promiseList)) {
      // 리프레쉬 토큰 만료 여부
      const isExpired = isExpires(getRefreshToken());
      if (isExpired) {
        logout();
        signOut({ redirect: false });
      } else {
        promiseList.push(
          new Promise((resolve, reject) => {
            tokenRefresh()
              .then(() => {
                resolve();
              })
              .catch(() => {
                logout();
                signOut({ redirect: false });
                reject();
              })
              .finally(() => {
                do {
                  console.log('Loading...');
                } while (promiseList.pop());
              });
          }),
        );
      }
    }
    await Promise.all(promiseList);
    // console.log(getAccessToken());
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
  },
  function (error) {
    
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const errorMsg = get(error, 'response.data.message');
    if (errorMsg == 'Unauthorized') {
      console.log('error : ' + errorMsg);
      // logout();
      await signOut({ redirect: false });
    }

    // globalThis.location.href = '/';
  },
);

const noneTokenHttp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

noneTokenHttp.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

noneTokenHttp.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const errorMsg = get(error, 'response.data.message');
    if (errorMsg == 'Unauthorized') {
      console.log('error : ' + errorMsg);
      // logout();
      await signOut({ redirect: false });
    }
    return Promise.reject(error);
  },
);

export default http;
export { http, noneTokenHttp };
