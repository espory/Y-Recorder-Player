import { mix } from '../../common/utils';
import { postfilePreDetection } from './service';
import {
  FileWordTwoTone,
  FilePdfTwoTone,
  FileExcelTwoTone,
  FilePptTwoTone,
  FileMarkdownTwoTone,
  FileTextTwoTone,
  FileImageTwoTone,
  FileTwoTone } from '@ant-design/icons';
import {
  FileWordOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  FilePptOutlined,
  FileMarkdownOutlined,
  FileTextOutlined,
  FileImageOutlined,
  FileOutlined,
} from '@ant-design/icons';
// 返回将日期格式改为'X天前'的时间差模式，若日期格式解析失败返回空字符串
export function enhanceUpdatedTime(updated_at) {
  const oldTime = new Date(updated_at);
  // 如果传入的日期格式解析失败，则直接返回空字符串，不修改updated_at的值
  // 解析失败oldTime的值为Invalid Date，但仍为Date对象
  if (oldTime instanceof Date && !isNaN(oldTime.getTime())) {
    let diff = Math.floor((new Date() - oldTime) / 1000 / 60); // min
    const multiple = [ 60, 24, 30, 12, 1000000 ];
    const hint = [ '分钟前', '小时前', '天前', '月前', '年前' ];
    if (diff <= 0) {
      return '1分钟内';
    }
    let index = 0;
    for (let i = 0; i < multiple.length; i++) {
      if (Math.floor(diff / multiple[index]) <= 0) {
        return diff + hint[index];
      }
      diff = Math.floor(diff / multiple[index]);
      index += 1;

    }

  }
  return '';
}

export function formatLibraryItem(item) {
  const forbiddenField = [ 'id' ];
  const temp = {};
  Object.keys(item?.extra || {}).forEach(key => {
    if (forbiddenField.indexOf(key) === -1) {
      temp[key] = item.extra[key];
    }
  });
  // 修改’updated_at‘属性的格式
  item.updated_at = enhanceUpdatedTime(item.updated_at) || item.updated_at;
  item = mix(item, temp);
  item.key = item.id;
  return item;
}


// initWidth表示初始状态下的宽度值，支持百分比与直接赋值, 未赋值的会自适应宽度（平分剩余空间）
export const colValues = [
  { key: 'title', label: '标题', initWidth: '30%' },
  { key: 'authors', label: '作者', initWidth: '20%' },
  { key: 'journal', label: '出版' }, // 修复设置里选择“出版”页面崩溃（key值错误）
  { key: 'type', label: '类型' },
  { key: 'year', label: '年份' },
  { key: 'updated_at', label: '修改时间' },
  // { key: 'container-title', label: '出版' },
  { key: 'tags', label: '标签' },
  { key: 'mark', label: '评分' },
  { key: 'attachment', label: '附件' },
  { key: 'trashOperation', label: '操作' },
  { key: 'operation', label: '操作', initWidth: '120px' }];

export function colAddField(tableColIdx, field) {
  let idx = -1;
  for (let i = 0; i < colValues.length; i++) {
    if (colValues[i].key === field) {
      idx = i;
      break;
    }
  }
  if (idx !== -1 && tableColIdx.indexOf(idx) === -1) {
    tableColIdx.push(idx);
  }
  return tableColIdx;
}
export const selectOptions = [
  {
    value: 'title',
    label: '标题',
  },
  {
    value: 'authors',
    label: '作者',
  },
  {
    value: 'container-title',
    label: '出版',
  },
  {
    value: 'ISBN',
    label: 'ISBN',
  },
  {
    value: 'DOI',
    label: 'DOI',
  },
  {
    value: 'tags',
    label: '标签',
  },
];

export const tagsColors = [ 'blue', 'red', 'magenta', 'geekblue', 'purple', 'cyan' ];

// 检查是否存在bib文件有很多行的情况，如果有把此bib文件进行拆分
export const checkSplitFile = async files => {
  const filesList = [];
  const bibErrorInfo = [];

  try {
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      if (file.name.split('.').pop() === 'bib') {
        const bibFileName = file.name;
        const reader = new FileReader();
        // reader.readAsBinaryString(file);
        reader.readAsText(file);
        const result = await new Promise(resolve => {
          reader.addEventListener('load', function() {
            resolve(reader.result);
          }, false);
        });
        const bibList = result.split('@');
        bibList.shift();
        const bibs = [];
        bibList.forEach(bib => {
          bibs.push(`@${bib}`);
        });
        const detectionRes = await Promise.all(bibs.map(bib => {
          return postfilePreDetection({ bibEntry: bib });
        }));
        const legalList = [];
        const illegalList = [];
        for (let i = 0; i < detectionRes.length; i++) {
          if (detectionRes[i].correct) {
            legalList.push(i);
          } else {
            illegalList.push(i);
          }
        }
        for (let index = 0; index < illegalList.length; index++) {
          const illIndex = illegalList[index];
          bibErrorInfo.push({ title: `在${bibFileName}文件中，第${illIndex + 1}篇文献格式存在问题，问题格式如下：`, content: bibs[illIndex] });
        }
        legalList.forEach((fileIndex, index) => {
          const newFile = new File([ `${bibs[fileIndex]}` ], `${index + 1}-${bibFileName}`);
          filesList.push(newFile);
        });
      } else {
        filesList.push(file);
      }
    }
  } catch (error) {
    console.log('error: ', error);
  }
  return { filesList, bibErrorInfo };
};


// 双色风格图标
const suffixMap = function(className) {
  return {
    '.doc': <FileWordTwoTone className={className} />,
    '.pdf': <FilePdfTwoTone className={className} />,
    '.xls': <FileExcelTwoTone className={className} />,
    '.ppt': <FilePptTwoTone className={className} />,
    '.md': <FileMarkdownTwoTone className={className} />,
    '.txt': <FileTextTwoTone className={className} />,
    '.jpg': <FileImageTwoTone className={className} />,
    '.png': <FileImageTwoTone className={className} />,
    '.jpeg': <FileImageTwoTone className={className} />,
    '.gif': <FileImageTwoTone className={className} />,
    '.bmp': <FileImageTwoTone className={className} />,
    default: <FileTwoTone className={className} />,
  };
};

// 线框风格图标
const suffixMapSimple = function(className) {
  return {
    '.doc': <FileWordOutlined className={className} />,
    '.pdf': <FilePdfOutlined className={className} />,
    '.xls': <FileExcelOutlined className={className} />,
    '.ppt': <FilePptOutlined className={className} />,
    '.md': < FileMarkdownOutlined className={className} />,
    '.txt': <FileTextOutlined className={className} />,
    '.jpg': <FileImageOutlined className={className} />,
    '.png': <FileImageOutlined className={className} />,
    '.jpeg': <FileImageOutlined className={className} />,
    '.gif': <FileImageOutlined className={className} />,
    '.bmp': <FileImageOutlined className={className} />,
    default: <FileOutlined className={className} />,
  };
};

// 文件后缀对应图标
export const fileIcon = function(filename, className = '', iconStyle = 'complex') {
  const iconMap = iconStyle === 'complex' ? suffixMap(className) : suffixMapSimple(className);
  const lowerCaseName = filename.toLowerCase();
  for (const key in iconMap) {
    if (Object.hasOwnProperty.call(iconMap, key)) {
      if (lowerCaseName.indexOf(key) !== -1) { return iconMap[key]; }
    }
  }
  return iconMap.default;
};
