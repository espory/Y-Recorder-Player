import { isNil, strToNum } from '../../../model/util';
import { enhanceUpdatedTime } from '../../../pages/lib/utils';
export default class BaseModel {
  constructor(entry = {}) {
    const { extra = {} } = entry;
    const { fields, editFields, type } = BaseModel;
    this.extra = { ...extra };
    this._fillFields(entry, this._mergeFields(fields, editFields));
    this.editFields = editFields;
    this.type = type;
  }
  _setPublishTitle(publishTitle) {
    this.journal = publishTitle;
  }
  _checkEditFields() {
    const { editFields = {}, type: modelType } = this;
    for (const rule of editFields) {
      const { name, type, required } = rule;
      // undefined & null
      if (isNil(this[name]) && required) {
        // throw new Error(`required field:${name} not found in ${modelType}`);
        console.error(`required field:${name} not found in ${modelType}`);
      }
      // isArray
      if (type === 'array' && !Array.isArray(this[name]) && required) {
        // throw new Error(`type of required field:${name} is ${typeof this[name]} but ${type} expected`);
        console.error(`required field:${name} not found in ${modelType}`);

      }
    }
    return true;
  }
  // 将editFields与fields合并,
  _mergeFields(fields, editFields) {
    const mergedFields = { ...(fields) };
    if (Array.isArray(editFields)) {
      editFields.forEach(item => {
        const { name, ...rest } = item;
        mergedFields[name] = {
          ...mergedFields[name],
          ...rest,
        };
      });
    }
    return mergedFields;
  }
  // 将属性填入field，填入前执行computed，填入后进行类型检查
  _fillFields(entry, fields) {
    Object.keys(fields).forEach(key => {
      const { type, computed, default: defaultValue, required, alias } = fields[key];
      const copyTarget = entry[key] || (alias ? entry[alias] : undefined);
      if (isNil(copyTarget)) {
        if (typeof defaultValue !== 'undefined') {
          this[key] = defaultValue;
        } else {
          if (required) {
            console.error(`${key} is required but got undefined`);
            // throw new Error(`${key} is required but got undefined`);
          }
          return;
        }
      } else {
        this[key] = copyTarget;
      }

      if (computed && typeof computed === 'function') {
        this[key] = computed.call(this, this[key]);
      }
      if (type === 'number') {
        try {
          this[key] = strToNum(this[key]);
        } catch (error) {
          this[key] = 0;
          console.log(error);
        }
      }
      let checkType = true;
      const target = this[key];
      switch (type) {
        case 'array':
          if (!Array.isArray(target)) {
            checkType = false;
          }
          break;
        default:
          if (typeof target !== type) {
            checkType = false;
          }
          break;
      }
      if (!checkType) {
        throw new Error(`field ${key} should be ${type} but got ${typeof target}`);
      }
    });
  }

  getType() {
    return this.type;
  }

  getFields() {
    return BaseModel.fields;
  }

  getFormattedAuthors() {
    const { authors } = this;
    if (authors.length === 0) {
      return '';
    }
    if (authors.length === 1) {
      return authors[0];
    }
    return authors.reduce((r, author, idx, arr) => {
      if (idx === arr.length - 1) {
        r += `and ${author}`;
      } else {
        r += `${author}, `;
      }
      return r;
    }, '');
  }

  getShortInfo(joinFuc) {
    if (!this._checkEditFields()) return;
    if (typeof joinFuc === 'function') {
      return joinFuc.call(this);
    }
    const { title } = this;
    return `${this.getFormattedAuthors()}. ${title}.`;
  }
}

BaseModel.editFields = [
  { name: 'authors', type: 'array', required: true },
  { name: 'howpublished', type: 'string' },
];

// 基础属性
// type: 类型检查
// computed: 预处理函数
// required: 当required为true并且default未定义时，如果输入entry中没有定义值，则抛出Error
// default: 缺省时的值
// 执行顺序 default赋值 -> 检查required -> 执行computed -> type类型检查
BaseModel.fields = {
  id: {
    type: 'number',
  },
  title: {
    type: 'string',
    computed: title => {
      if (typeof title !== 'string') {
        throw new Error('title should be String');
      }
      return title.trim();
    },
    default: '',
  },
  alias: {
    type: 'string',
    computed: alias => {
      if (typeof alias !== 'string') {
        throw new Error('alias should be String');
      }
      return alias.trim();
    },
    default: '',
  },
  authors: {
    type: 'array',
    computed: authors => {
      if (typeof authors !== 'string' && !Array.isArray(authors)) {
        throw new Error('authors should be String of Array');
      }
      authors = typeof authors === 'string' ? authors.split(' and ') : authors;
      return authors.map(author => author.split(' ').map(name => {
        if (typeof name !== 'string') name = '';
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      }).join(' '));
    },
  },
  fileUrl: {
    type: 'string',
    default: '',
  },
  status: {
    type: 'number',
  },
  tags: {
    type: 'array',
    computed: tags => {
      if (typeof tags !== 'string') {
        throw new Error('tags should be String');
      }
      return tags === '' ? [] : JSON.parse(tags);
    },
    default: '[]', // '[]'会经过computed转为[]
  },
  file_attachments: {
    type: 'array',
    default: [],
  },
  comments: {
    computed: comments => {
      console.log(comments);
      return comments.map(comment => {
        comment.userName = comment.userName || comment?.user?.name || 'unknown';
        delete comment.user;
        return comment;
      });
    },

    type: 'array',
    default: [],
  },
  mark: {
    type: 'number',
    default: 0,
  },
  abstract: {
    type: 'string',
    default: '',
  },
  updated_at: {
    type: 'string',
    computed: enhanceUpdatedTime,
    default: '',
  },
  user_create: {
    type: 'number',
  },
  user_modify: {
    type: 'number',
  },
  commentLength: {
    type: 'number',
    default: 0,
  },
};
BaseModel.type = 'misc';
