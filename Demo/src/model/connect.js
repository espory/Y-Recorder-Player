import { connect } from 'react-redux';
import { getStore } from './index';

function getModel(namespace) {
  const store = getStore();
  const model = namespace ? store.model.getChild(namespace) : store.model;
  if (!model) throw new Error('cannot find model at the namespace');
  return model;
}

/*
* 连接 store 和组件。建议在复杂场景中子组件直接获取 store 中的状态。
*/
export default function(args = {}) {
  const { namespace, mapStateToProps, mapDispatchToProps } = args;
  const mapState = () => {
    const model = getModel(namespace);
    return mapStateToProps ? mapStateToProps(model.getState()) : model.getState();
  };
  if (mapDispatchToProps) {
    return connect(
      mapState,
      (dispatch, ownProps) => {
        const model = getModel(namespace);
        return mapDispatchToProps ? mapDispatchToProps(model.dispatch, ownProps) : model.getState();
      }
    );
  }
  return connect(
    mapState,
    null,
    (stateProps, dispatchProps, ownProps) => {
      const model = getModel(namespace);
      return Object.assign({}, ownProps, stateProps, { dispatch: model.dispatch });
    }
  );
}
