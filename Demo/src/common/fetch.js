import axios from 'axios';
import { message } from 'antd';

// 本地开发时由于最新版本chrome same-site策略禁止跨域cookie改写，使用反向代理避免此问题
// export const HOST = '/local-server';
export const HOST = 'http://101.43.119.45:7001';

export const FILES_HOST = 'http://101.43.119.45:7051'; // 测试端-静态文件服务器地址,内网访问
// export const FILES_HOST = 'http://www.y-droid.com/fileSystem'; // 生产端-静态文件服务器地址

axios.interceptors.response.use(
  null,
  error => {
    console.log(error);
    return Promise.reject(error.response);
  });

export default function fetch(option = {}) {
  const { url, byteResponse = false, ...rest } = option;
  return axios({
    url: `${HOST}${url}`,
    withCredentials: true,
    ...rest,
  }).then(res => {
    const { status, data } = res;
    if (status !== 200) {
      message.error('服务器错误，请重试');
      return Promise.reject(new Error('服务器错误，请重试'));
    }
    const { code, msg } = data || {};
    if (code === '1000') {
      return data.data;
    }
    if (byteResponse) {
      return data;
    }
    const errorMsg = message.error({
      content: msg || '服务器错误，请重试',
      duration: 5,
      onClick: () => errorMsg() });
    throw new Error(msg);
    // return Promise.reject(new Error(msg));
  });
}
