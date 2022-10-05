const acorn = require('acorn');
module.exports = () => {
  const REPLACE_TYPES = [];
  // const REPLACE_TYPES = [ 'click' ];
  const REACT_REPLACE_TYPES = [ 'onClick', 'onChange', 'onFinish' ];
  const REACT_TYPES_MAP = {
    onClick: 'click',
    onChange: 'data',
    onFinish: 'data',
  };
  const ERROR_TYPE = 'error';
  const TEMPLATE = type => {
    return `if(window.YPLAYER_DEBUG && window.YPLAYER_DEBUG_TAGS.${type}){
      debugger;
    }`;
  };
  const WRAP_TEMPLATE = type => {
    return `(...args)=>{
      if(window.YPLAYER_DEBUG &&  window.YPLAYER_DEBUG_TAGS.${type}){
        debugger;
      }
      ydebugger(...args)
    }`;
  };

  const addDebuggerTag = (node, _, type) => {
    if (node?.body?.body instanceof Array) {
      if (
        node?.body?.body.length > 0 &&
        (node?.body?.body[0].type === 'IfStatement') &&
        (node?.body?.body[0]?.consequent?.body instanceof Array) &&
        (node?.body?.body[0]?.consequent?.body.length > 0) &&
        (node?.body?.body[0]?.consequent?.body[0].type === 'DebuggerStatement')) {
        return;
      }
      const newNode = acorn.parse(TEMPLATE(type)).body[0];
      node.body.body.unshift(newNode);
    }
  };

  const wrapFunc = (node, path, type) => {
    const s = WRAP_TEMPLATE(type);
    const REACR_TEMPLATE = acorn.parse(s).body[0];
    REACR_TEMPLATE.expression.body.body[1].expression.callee = node;
    path.node.value.expression = REACR_TEMPLATE.expression;
  };

  const strategy = {
    FunctionExpression: addDebuggerTag,
    ArrowFunctionExpression: addDebuggerTag,
    Identifier: wrapFunc,
    MemberExpression: wrapFunc,
  };

  return {
    visitor: {
      JSXIdentifier(path) {
        if (REACT_REPLACE_TYPES.includes(path.node.name)) {
          const type = REACT_TYPES_MAP[path.node.name];
          const node = path?.parentPath?.node?.value?.expression;
          const rootPath = path?.parentPath;
          const nodeType = node?.type;
          if (node && rootPath && nodeType && (nodeType in strategy)) {
            strategy[nodeType](node, rootPath, type);
          }
        }
      },
      Identifier(path) {
        if (path.node.name === 'addEventListener') {
          if (path.parentPath.parent.arguments.length >= 2) {
            const eventType = path.parentPath.parent.arguments[0]?.value;
            if (!(REPLACE_TYPES.includes(eventType))) {
              return;
            }
            const node = path?.parentPath?.parent.arguments[1];
            const nodeType = node?.type;
            const rootPath = path?.parentPath?.parentPath;
            // debugger;
            if (node && nodeType in strategy && rootPath) {
              strategy[nodeType](node, rootPath);
            }
          }
        }
      },
      CatchClause(path) {
        const catchStatement = path?.node?.body;
        if (catchStatement) {
          const newNode = acorn.parse(TEMPLATE(ERROR_TYPE)).body[0];
          catchStatement.body?.unshift(newNode);
        }
      },
    },
  };
};

