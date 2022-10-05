import BaseModel from './baseModel';

export default class Article extends BaseModel {
  constructor(entry) {
    super(entry);
    const { fields, editFields, type } = Article;
    this._fillFields(entry, this._mergeFields(fields, editFields));
    this.editFields = editFields;
    this.type = type;
    this._checkEditFields();
    this._setPublishTitle(this.journal);
  }

  joinFnc() {
    const { title, journal, volume, number, pages, year } = this;
    return `${this.getFormattedAuthors()}. ${title || ''}. ${journal || ''}. ${volume || ''}[${number || ''}]. ${pages || ''}. ${year || ''}.`;
  }
}

Article.editFields = [
  { name: 'authors', type: 'array', extra: '请用逗号分割作者', required: true },
  { name: 'journal', type: 'string', required: true },
  { name: 'volume', type: 'string', required: true },
  { name: 'number', type: 'string', required: true },
  { name: 'pages', type: 'string', required: true },
  { name: 'year', type: 'number', required: true },
  { name: 'publisher', type: 'string' },
  { name: 'address', type: 'string' },
  { name: 'date', type: 'string' },
  // { name: 'url', type: 'string' },
  { name: 'doi', type: 'string' },
  { name: 'isbn', type: 'string' },
];
Article.fields = {
  journal: {
    type: 'string',
    default: '',
  },
  volume: {
    type: 'string',
    computed: volume => {
      if (typeof volume !== 'string') {
        volume = String(volume);
      }
      return volume.trim();
    },
    default: '',
  },
  number: {
    type: 'string',
    computed: number => {
      if (typeof number !== 'string') {
        number = String(number);
      }
      return number.trim();
    },
    default: 0,
  },
  pages: {
    type: 'string',
    computed: pages => {
      if (typeof pages !== 'string') {
        pages = String(pages);
      }
      return pages.trim();
    },
    default: '',
  },
  year: {
    type: 'number',
    default: 0,
  },
};
Article.type = 'article';
