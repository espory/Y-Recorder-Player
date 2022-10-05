import Article from './article';
import BaseModel from './baseModel';
import Inproceedings from './inproceedings';
import Book from './book';
const loadedDocModel = {
  article: Article,
  book: Book,
  inproceedings: Inproceedings,
  other: BaseModel,
  misc: BaseModel,
};
export function genDocModel(docEntry) {
  // 空对象不构造
  if (Object.keys(docEntry).length === 0) {
    return;
  }
  const { extra = {} } = docEntry;
  // eslint-disable-next-line
  const { type, id: bibId, ...rest } = extra;
  const formatType = type?.toLocaleLowerCase();
  docEntry = Object.assign(docEntry, { type: formatType, ...rest });
  for (const key in loadedDocModel) {
    if (formatType === key) {
      return new loadedDocModel[formatType](docEntry);
    }
  }
  return new BaseModel(docEntry);
}


export const getLoadedDocModel = () => {
  return loadedDocModel;
};
