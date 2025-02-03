import { AxiosContext, useAxios } from '@api/request';
import { useContext } from 'react';

/**
 * 파일 업로드 API
 * @description utils/file.js의 uploadFile 메서드 사용하세요.
 */
export const uploadFile = (file: any) => {
  return new Promise((resolve, reject) => {
    useContext(AxiosContext)
      .post('/upload-file', file)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
