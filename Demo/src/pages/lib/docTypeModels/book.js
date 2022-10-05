import BaseModel from './baseModel';

export default class Book extends BaseModel {
  constructor(entry) {
    super(entry);
    const { fields, editFields, type } = Book;
    this._fillFields(entry, this._mergeFields(fields, editFields));
    this.editFields = editFields;
    this.type = type;
    console.log(this);
    this._checkEditFields();
    // 主页显示的出版信息， dataIndex为journal
    this._setPublishTitle(this.publisher);
  }

  joinFnc() {
    const { title, publisher, year } = this;
    return `${this.getFormattedAuthors()}. ${title || ''}. ${publisher || ''}. ${year || ''}.`;
  }
}

Book.editFields = [
  { name: 'authors', type: 'array', required: true },
  { name: 'publisher', type: 'string', required: true },
  { name: 'year', type: 'number', required: true },
  { name: 'address', type: 'string' },
  { name: 'date', type: 'string' },
  // { name: 'url', type: 'string' },
  { name: 'doi', type: 'string' },
  { name: 'isbn', type: 'string' },
];
Book.fields = {
  year: {
    type: 'number',
  },
  publisher: {
    type: 'string',
  },
};
Book.type = 'book';
