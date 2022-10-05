import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { getStore } from '../../model';

export default (option = {}) => InnerComponent => {
  const {
    store: config,
    autoReset = true,
  } = option;

  const store = getStore();
  const model = store.addModel(config);
  class OuterComponent extends PureComponent {

    componentWillMount() {
      const { dispatch } = this.props;
      dispatch('_setup');
    }

    componentWillUnmount() {
      if (autoReset) {
        const { dispatch } = this.props;
        dispatch('_reinit');
      }
    }

    render() {
      const { loading = false } = this.props;
      return (<Spin tip="loading..." spinning={loading}>
        <InnerComponent {...this.props} />
      </Spin>);
    }
  }

  const Component = connect(
    // mapStateToProps 任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用
    // 返回对象会与props合并
    () => model.getState(),
    null,
    // 前两个函数的返回值和自身的props
    (stateProps, dispatchProps, ownProps) =>
      Object.assign({}, ownProps, stateProps, { dispatch: model.dispatch })
  )(OuterComponent);

  return Component;
};
