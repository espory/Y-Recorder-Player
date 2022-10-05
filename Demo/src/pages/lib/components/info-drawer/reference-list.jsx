import { PureComponent } from 'react';
import { List, Empty } from 'antd';
const { Item } = List;

class ReferenceList extends PureComponent {
  render() {
    const { dispatch, refs = [], record } = this.props;
    const { title } = record;
    let body;
    if (!Array.isArray(refs) || refs.length === 0) {
      body = <Empty tag='div'
        className="empty-info"
        description={
          <>
            <span>暂无数据</span>
            {/* <br/>
            { url.length === 0 && <span>上传PDF文件以解析引用</span>} */}
          </>
        }></Empty>;
    } else {
      const type = refs[0].type.toUpperCase();
      body = <>
        <div style={{ fontStyle: 'italic', color: 'grey' }}>{`来源：${type}`}</div>
        <List
          dataSource={refs}
          renderItem={(item, idx) => {
            const { row_text, inTopic, title, authors } = item;
            if (!inTopic) {
              const titleLength = title.length;
              if (titleLength) {
                const index = row_text.indexOf(title);
                return <Item>
                  {`[${idx + 1}] ${row_text.slice(0, index)}`}
                  <span className='info-drawer-ref-clickable-title'
                    onClick={e => {
                      const title = e.target.innerText;
                      dispatch('setData', { fileFormVisible: true, formData: { title, authors: authors.split(' and ') } });
                      // dispatch('createFile', { title, authors: authors.split(',') });
                    }}>
                    {title}
                  </span>
                  {row_text.slice(index + titleLength)}
                </Item>;
              }
              return <Item>
                {`[${idx + 1}] ${row_text}`}
              </Item>;
            }
            return <Item className='info-drawer-ref-in-topic'>
              {`[${idx + 1}] ${row_text}`}
            </Item>;

          }}
        />
      </>;
    }
    return <>
      <h2>{title}</h2>
      {body}
    </>;
  }
}

export default ReferenceList;
