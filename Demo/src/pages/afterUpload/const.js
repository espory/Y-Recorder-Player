export const STEP_STATUS = {
  finish: 'finish',
  wait: 'wait',
  process: 'process',
  error: 'error',
};

export const STATUS_INFO_MAP = [
  {
    title: '上传',
    description: {
      error: '上传失败',
      process: '上传文件中',
      finish: '上传成功',
    },
  },
  {
    title: '解析',
    description: {
      error: '解析失败,请手动输入文献信息',
      process: '解析中',
      finish: '解析成功',
    },
  },
  {
    title: '保存',
    description: {
      error: '',
      process: '保存后仍可修改',
      finish: '',
    },
  }];
