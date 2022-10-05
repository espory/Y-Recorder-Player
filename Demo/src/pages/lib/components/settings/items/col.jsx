import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;
import { colValues } from '../../../utils';
const checkBoxOptions = colValues.map((v, idx) => {
  return { label: v.label,
    disabled: !idx,
    value: v.key };
});
// operation
checkBoxOptions.pop();
// trashOperation
checkBoxOptions.pop();

export const tableCol = (tableColIdx, dispatch) => {
  const choosed = [];
  for (const idx of tableColIdx) {
    if (idx < colValues.length) {
      choosed.push(colValues[idx].key);
    }
  }
  return <CheckboxGroup
    options={checkBoxOptions}
    defaultValue={choosed}
    onChange = {selectedKeys => {
      const selected = [];
      colValues.forEach((it, idx) => {
        if (selectedKeys.indexOf(it.key) > -1) {
          selected.push(idx);
        }
      });
      // dispatch('updateCol', { tableColIdx: selected });
      dispatch('updateCol', { tableColIdx: selected, tableColIdxOrigin: selected });
    }}
  />;

};
