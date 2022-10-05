export const formConfig = [
  {
    name: 'title',
    label: '标题',
    rule: {
      required: true,
    },
    inCreate: true,
  },
  {
    name: 'authors',
    label: '作者',
    extra: '请用 and 分隔作者',
    rule: {
      required: false,
    },
    inCreate: true,
  },
  {
    name: 'doi',
    label: 'Doi',
    rule: {
      required: true,
    },
    inCreate: false,
  },
  {
    name: 'year',
    label: '年份',
    rule: {
      required: true,
      type: 'number',
    },
    inCreate: false,
  },
  {
    name: 'type',
    label: '类型',
    rule: {
      required: true,
    },
    inCreate: false,
    // child: (<Select placeholder="选择文件类型" allowClear>
    //   { selectOption.map((item, index) => {
    //     return (<Option value={item} key={index}>{item}</Option>);
    //   })}
    // </Select>),
  },
];

export const TYPE = {
  DOCUMENT: { name: 'document', title: '添加文献' },
  ATTACHMENT: { name: 'attachment', title: '添加附件' },
};

