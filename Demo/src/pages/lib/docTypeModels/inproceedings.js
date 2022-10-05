import BaseModel from './baseModel';

export default class Inproceedings extends BaseModel {
  constructor(entry) {
    super(entry);
    const { fields, editFields, type } = Inproceedings;
    this._fillFields(entry, this._mergeFields(fields, editFields));
    this.editFields = editFields;
    this.type = type;
    this._checkEditFields();
    this._setPublishTitle(this.booktitle);
  }

  joinFnc() {
    const { title, booktitle, series, pages, year } = this;
    return `${this.getFormattedAuthors()}. ${title || ''}. ${series ? series || '' : booktitle || ''}. ${pages || ''}. ${year || ''}.`;
  }
}

Inproceedings.editFields = [
  { name: 'authors', type: 'array', required: true },
  { name: 'booktitle', type: 'string', required: true },
  // { name: 'series', type: 'string' },
  { name: 'year', type: 'number', required: true },
  { name: 'pages', type: 'string', required: true },
  { name: 'publisher', type: 'string' },
  { name: 'address', type: 'string' },
  { name: 'date', type: 'string' },
  // { name: 'url', type: 'string' },
  { name: 'doi', type: 'string' },
  { name: 'isbn', type: 'string' },
];
Inproceedings.fields = {
  booktitle: {
    type: 'string',
    alias: 'journal',
    default: '',
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
  doi: {
    type: 'string',
    default: '',
  },
};
Inproceedings.type = 'inproceedings';
