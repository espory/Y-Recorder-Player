/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./tools/helpers.ts
const _log = console.log.bind(null, '[Recorder]:');
const _error = console.error.bind(null, '[Recorder]:');
const _warn = console.warn.bind(null, '[Recorder]:');
function _now() {
    if (!window.performance)
        return Date.now();
    return Math.floor(performance.now());
}
function _throttle(func, wait = 100) {
    let previous = _now();
    return function (...args) {
        const now = _now();
        const restTime = now - previous;
        if (restTime >= wait) {
            previous = now;
            return func.apply(this, args);
        }
    };
}
function _newuuid() {
    return Math.random()
        .toString(16)
        .split('.')[1];
}
function _replace(source, name, replacement) {
    const original = source[name];
    function doReplace() {
        const wrapped = replacement(original);
        wrapped.__recorder__ = true;
        wrapped.__recorder_original__ = original;
        source[name] = wrapped;
    }
    if (original) {
        if (!(name in source) || original.__recorder__)
            return;
        doReplace();
        return;
    }
    else if (original === null || original === undefined) {
        doReplace();
        return;
    }
}
function _recover(source, name) {
    if (!(name in source) || !source[name].__recorder__)
        return;
    const { __recorder_original__ } = source[name];
    source[name] = __recorder_original__;
}
function _parseURL(href = location.href) {
    const match = href.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!match)
        return {};
    const query = match[6] || '';
    const fragment = match[8] || '';
    return {
        protocol: match[2],
        host: match[4],
        path: match[5],
        query,
        fragment,
        relative: match[5] + query + fragment
    };
}
function _seralize(obj) {
    return Object.keys(obj)
        .map(k => `${k}=${obj[k]}`)
        .join('&');
}

// CONCATENATED MODULE: ./constants.ts
const RECORDER_ID = 'recorder-id';
const RECORDER_PRESET = {
    mutation: true,
    history: true,
    error: {
        jserror: true,
        unhandledrejection: true
    },
    console: {
        info: true,
        error: true,
        log: false,
        warn: true,
        debug: false
    },
    event: {
        scroll: true,
        resize: true,
        form: true
    },
    http: {
        xhr: true,
        fetch: true,
        beacon: true
    },
    mouse: {
        click: true,
        drag: true,
        mousemove: true,
        dblclick: true,
        rightClick: true,
        mousedown: true,
        mouseup: true
    },
    Keyboard: {
        keydown: true,
        keypress: true,
        keyup: true,
    },
    maxTimeSpan: 120000
};

// CONCATENATED MODULE: ./tools/is.ts
function isFunction(sth) {
    return typeof sth === 'function';
}
function isErrorEvent(sth) {
    return Object.prototype.toString.call(sth) === '[object ErrorEvent]';
}
function isError(sth) {
    switch (Object.prototype.toString.call(sth)) {
        case '[object Error]':
            return true;
        case '[object Exception]':
            return true;
        case '[object DOMException]':
            return true;
        default:
            return sth instanceof Error;
    }
}

// CONCATENATED MODULE: ./tools/pub-sub.ts

class pub_sub_EventDrivenable {
    constructor() {
        this.queues = new Map();
        this.$on = (hook, action) => {
            const { queues } = this;
            const existingTasks = queues.get(hook) || [];
            queues.set(hook, [...existingTasks, action]);
        };
        this.$off = (hook, thisAction) => {
            const Q = this.queues.get(hook) || [];
            if (!Q.length) {
                return;
            }
            const index = Q.indexOf(thisAction);
            if (index !== -1) {
                Q.splice(index, 1);
                this.queues.set(hook, Q);
            }
        };
        this.$emit = (hook, ...args) => {
            const Q = this.queues.get(hook) || [];
            if (!Q.length) {
                return;
            }
            try {
                Q.forEach(action => {
                    if (isFunction(action)) {
                        action(...args);
                    }
                });
            }
            catch (error) {
                console.error(error);
            }
        };
    }
}

// CONCATENATED MODULE: ./observers/console.ts



class console_ConsoleObserver extends pub_sub_EventDrivenable {
    constructor(options) {
        super();
        this.consoleLevels = Object.keys(RECORDER_PRESET.console);
        this.options = RECORDER_PRESET.console;
        if (typeof options === 'boolean' && options === false) {
            return;
        }
        if (typeof options === 'object') {
            this.options = { ...this.options, ...options };
        }
    }
    install() {
        const { $emit } = this;
        this.consoleLevels.forEach((level) => {
            if (!this.options[level])
                return;
            function consoleReplacement(originalConsoleFunc) {
                return function (...args) {
                    if (!args.length)
                        return;
                    const record = {
                        type: 'console',
                        level: level,
                        input: args
                    };
                    $emit('observed', record);
                    if (originalConsoleFunc) {
                        originalConsoleFunc.call(console, ...args);
                    }
                };
            }
            _replace(console, level, consoleReplacement);
        });
        _log('console observer ready!');
    }
    uninstall() {
        this.consoleLevels.forEach((level) => {
            if (!this.options[level])
                return;
            _recover(console, level);
        });
    }
}

// CONCATENATED MODULE: ./tools/SonyA7R3.ts

class SonyA7R3_SonyA7R3Camera {
    constructor() {
        this.map = new Map();
        this.inited = false;
        this.id = 0;
        this.buffer = (ele) => {
            if (ele.id && ele.id.startsWith('y-record')) {
                console.log(ele);
                return;
            }
            let recorderId = this.map.get(ele) || this.newId();
            this.map.set(ele, recorderId);
            this.mark(ele, recorderId);
            return recorderId;
        };
        this.bufferNewElement = (ele) => {
            this.buffer(ele);
            if (ele.childElementCount) {
                Array.prototype.slice.call(ele.children).forEach(chEle => this.bufferNewElement(chEle));
            }
        };
        this.getRecordIdByElement = (ele) => {
            return this.map.get(ele);
        };
    }
    takeSnapshotForPage() {
        console.time('[Snapshot for page]');
        Array.prototype.slice.call(document.querySelectorAll('*')).forEach(this.buffer);
        this.latestSnapshot = document.documentElement.outerHTML;
        console.timeEnd('[Snapshot for page]');
        return this.latestSnapshot;
    }
    newId() {
        this.id += 1;
        return this.id;
    }
    mark(ele, id) {
        ele.setAttribute(RECORDER_ID, id);
    }
    unmark(ele, isDeep = false) {
        const { removeAttribute } = ele;
        removeAttribute && ele.removeAttribute(RECORDER_ID);
        if (isDeep && ele.childElementCount) {
            Array.prototype.slice.call(ele.children).forEach(chEle => this.unmark(chEle));
        }
    }
}
const SonyA7R3 = new SonyA7R3_SonyA7R3Camera();
/* harmony default export */ var tools_SonyA7R3 = (SonyA7R3);

// CONCATENATED MODULE: ./models/observers.ts
var ConsoleLevels;
(function (ConsoleLevels) {
    ConsoleLevels["info"] = "info";
    ConsoleLevels["error"] = "error";
    ConsoleLevels["log"] = "log";
    ConsoleLevels["warn"] = "warn";
    ConsoleLevels["debug"] = "debug";
})(ConsoleLevels || (ConsoleLevels = {}));
var ConsoleTypes;
(function (ConsoleTypes) {
    ConsoleTypes["console"] = "console";
})(ConsoleTypes || (ConsoleTypes = {}));
var EventTypes;
(function (EventTypes) {
    EventTypes["scroll"] = "scroll";
    EventTypes["resize"] = "resize";
    EventTypes["form"] = "form";
})(EventTypes || (EventTypes = {}));
var KeyboardTypes;
(function (KeyboardTypes) {
    KeyboardTypes["keyup"] = "keyup";
    KeyboardTypes["keydown"] = "keydown";
    KeyboardTypes["keypress"] = "keypress";
})(KeyboardTypes || (KeyboardTypes = {}));
var DragTypes;
(function (DragTypes) {
    DragTypes["dragstart"] = "dragstart";
    DragTypes["drag"] = "drag";
    DragTypes["dragenter"] = "dragenter";
    DragTypes["dragover"] = "dragover";
    DragTypes["drop"] = "drop";
    DragTypes["dragend"] = "dragend";
    DragTypes["dragleave"] = "dragleave";
})(DragTypes || (DragTypes = {}));
var MouseTypes;
(function (MouseTypes) {
    MouseTypes["click"] = "click";
    MouseTypes["dblclick"] = "dblclick";
    MouseTypes["move"] = "move";
    MouseTypes["rightClick"] = "rightClick";
    MouseTypes["mouseup"] = "mouseup";
    MouseTypes["mousedown"] = "mousedown";
})(MouseTypes || (MouseTypes = {}));
var HistoryTypes;
(function (HistoryTypes) {
    HistoryTypes["history"] = "history";
})(HistoryTypes || (HistoryTypes = {}));
var HttpRockets;
(function (HttpRockets) {
    HttpRockets["beacon"] = "beacon";
    HttpRockets["fetch"] = "fetch";
    HttpRockets["xhr"] = "xhr";
})(HttpRockets || (HttpRockets = {}));
var HttpEndTypes;
(function (HttpEndTypes) {
    HttpEndTypes["fetcherror"] = "fetcherror";
    HttpEndTypes["xhrerror"] = "xhrerror";
    HttpEndTypes["xhrabort"] = "xhrabort";
    HttpEndTypes["xhrtimeout"] = "xhrtimeout";
})(HttpEndTypes || (HttpEndTypes = {}));
var ErrorTypes;
(function (ErrorTypes) {
    ErrorTypes["jserr"] = "jserr";
    ErrorTypes["unhandledrejection"] = "unhandledrejection";
})(ErrorTypes || (ErrorTypes = {}));
var DOMMutationTypes;
(function (DOMMutationTypes) {
    DOMMutationTypes["attr"] = "attr";
    DOMMutationTypes["node"] = "node";
    DOMMutationTypes["text"] = "text";
})(DOMMutationTypes || (DOMMutationTypes = {}));

// CONCATENATED MODULE: ./observers/event.ts





const { getRecordIdByElement } = tools_SonyA7R3;
class event_EventObserver extends pub_sub_EventDrivenable {
    constructor(options) {
        super();
        this.listeners = [];
        this.options = RECORDER_PRESET.event;
        this.addListener = ({ target, event, callback, options }, cb) => {
            target.addEventListener(event, callback, options);
            this.listeners.push({
                target,
                event,
                callback
            });
            try {
                cb && cb();
            }
            catch (err) {
                _warn(err);
            }
        };
        this.getScrollPosition = () => {
            const isStandardsMode = document.compatMode === 'CSS1Compat';
            const x = isStandardsMode ? document.documentElement.scrollLeft : document.body.scrollLeft;
            const y = isStandardsMode ? document.documentElement.scrollTop : document.body.scrollTop;
            return { x, y };
        };
        this.getScrollRecord = (evt) => {
            const { target } = evt || { target: document };
            const { $emit } = this;
            let record = { type: EventTypes.scroll };
            if (target === document || !target) {
                let { x, y } = this.getScrollPosition();
                record = { ...record, x, y };
                $emit('observed', record);
                return;
            }
            let targetX = target;
            const { scrollLeft: x, scrollTop: y } = targetX;
            const recorderId = getRecordIdByElement(targetX);
            record = { ...record, x, y, target: recorderId };
            $emit('observed', record);
        };
        this.getResizeRecord = () => {
            const { clientWidth: w, clientHeight: h } = document.documentElement;
            const record = { type: EventTypes.resize, w, h };
            const { $emit } = this;
            $emit('observed', record);
        };
        this.getFormChangeRecord = (evt) => {
            const { target } = evt;
            if (target.contentEditable === 'true') {
                return;
            }
            let k;
            let v;
            const itemsWhichKeyIsChecked = ['radio', 'checked'];
            const targetX = target;
            const { type: formType } = targetX;
            if (itemsWhichKeyIsChecked.includes(formType)) {
                k = 'checked';
                v = targetX.checked;
            }
            else {
                k = 'value';
                v = targetX.value;
            }
            let x = 0, y = 0;
            if (targetX && targetX.getClientRects) {
                const rect = targetX.getClientRects()[0];
                if (rect) {
                    const { left, right, top, bottom } = rect;
                    x = (left + right) >> 1;
                    y = (top + bottom) >> 1;
                }
            }
            const record = {
                type: EventTypes.form,
                tagName: targetX.tagName.toLocaleLowerCase(),
                x,
                y,
                k,
                v
            };
            const { $emit } = this;
            $emit('observed', record);
        };
        if (typeof options === 'boolean' && options === false) {
            return;
        }
        if (typeof options === 'object') {
            this.options = { ...this.options, ...options };
        }
    }
    install() {
        const { addListener } = this;
        const { scroll, resize, form } = this.options;
        if (scroll) {
            addListener({
                target: document,
                event: 'scroll',
                callback: this.getScrollRecord,
                options: true
            });
        }
        if (resize) {
            addListener({
                target: window,
                event: 'resize',
                callback: _throttle(this.getResizeRecord)
            });
        }
        if (form) {
            addListener({
                target: document,
                event: 'change',
                callback: this.getFormChangeRecord,
                options: true
            });
            addListener({
                target: document,
                event: 'input',
                callback: _throttle(this.getFormChangeRecord, 300),
                options: true
            });
        }
        _log('events observer ready!');
    }
    uninstall() {
        this.listeners.forEach(({ target, event, callback }) => {
            target.removeEventListener(event, callback);
        });
    }
}

// CONCATENATED MODULE: ./observers/http.ts





class http_HttpObserver extends pub_sub_EventDrivenable {
    constructor(options) {
        super();
        this.options = RECORDER_PRESET.http;
        this.xhrRecordMap = new Map();
        if (typeof options === 'boolean' && options === false) {
            return;
        }
        if (typeof options === 'object') {
            this.options = { ...this.options, ...options };
        }
    }
    isSupportBeacon() {
        return !!navigator.sendBeacon;
    }
    hijackBeacon() {
        if (!this.isSupportBeacon())
            return;
        const { $emit } = this;
        function beaconReplacement(originalBeacon) {
            return function (url, data) {
                const result = originalBeacon.call(this, url, data);
                const record = {
                    type: HttpRockets.beacon,
                    url
                };
                $emit('observed', record);
                return result;
            };
        }
        _replace(window.navigator, 'sendBeacon', beaconReplacement);
    }
    isSupportFetch() {
        return window.fetch && window.fetch.toString().includes('native');
    }
    hijackFetch() {
        if (!this.isSupportFetch())
            return;
        const { $emit } = this;
        function fetchReplacement(originalFetch) {
            return function (input, config) {
                let _method = 'GET';
                let _url;
                if (typeof input === 'string') {
                    _url = input;
                }
                else if (input instanceof Request) {
                    const { method, url } = input;
                    _url = url;
                    if (method)
                        _method = method;
                }
                else {
                    _url = String(input);
                }
                if (config && config.method) {
                    _method = config.method;
                }
                const record = {
                    type: HttpRockets.fetch,
                    method: _method,
                    url: _url,
                    input: [...arguments]
                };
                return (originalFetch
                    .call(window, ...arguments)
                    .then((response) => {
                    try {
                        record.status = response.status;
                        record.response = response.clone().json();
                        $emit('observed', record);
                    }
                    catch (err) {
                        _warn(err);
                    }
                    return response;
                })
                    .catch((error) => {
                    const { message } = error;
                    record.errmsg = message;
                    $emit('observed', record);
                    throw error;
                }));
            };
        }
        _replace(window, 'fetch', fetchReplacement);
    }
    hijackXHR() {
        const { $emit } = this;
        const self = this;
        function XHROpenReplacement(originalOpen) {
            return function (method, url) {
                const requestId = _newuuid();
                const args = [...arguments];
                let record = {
                    type: HttpRockets.xhr,
                    url,
                    method,
                    headers: {}
                };
                this.__id__ = requestId;
                self.xhrRecordMap.set(requestId, record);
                return originalOpen.apply(this, args);
            };
        }
        function XHRSetRequestHeaderReplacement(originalSetter) {
            return function (key, value) {
                const requestId = this.__id__;
                const record = self.xhrRecordMap.get(requestId);
                if (record) {
                    record.headers[key] = value;
                }
                originalSetter.call(this, key, value);
            };
        }
        function XHRSendReplacement(originalSend) {
            return function (body) {
                const thisXHR = this;
                const { __id__: requestId, __skip_record__ } = thisXHR;
                let thisRecord = self.xhrRecordMap.get(requestId);
                if (thisRecord && !__skip_record__) {
                    thisRecord.payload = body;
                }
                function onreadystatechangeHandler() {
                    if (this.readyState === 4) {
                        if (this.__skip_record__)
                            return;
                        const record = self.xhrRecordMap.get(requestId);
                        if (record) {
                            record.status = thisXHR.status;
                            if (thisXHR.responseType === '' || thisXHR.responseType === 'text') {
                                record.response = thisXHR.responseText || thisXHR.response;
                            }
                            else {
                                record.response = thisXHR.responseType;
                            }
                            $emit('observed', record);
                        }
                    }
                }
                if ('onreadystatechange' in thisXHR && isFunction(thisXHR.onreadystatechange)) {
                    _replace(thisXHR, 'onreadystatechange', originalStateChangeHook => {
                        return (...args) => {
                            try {
                                onreadystatechangeHandler.call(thisXHR);
                            }
                            catch (err) {
                                _warn(err);
                            }
                            originalStateChangeHook.call(thisXHR, ...args);
                        };
                    });
                }
                else {
                    thisXHR.onreadystatechange = onreadystatechangeHandler;
                }
                try {
                    return originalSend.call(this, body);
                }
                catch (exception) {
                    const { message } = exception;
                    const record = self.xhrRecordMap.get(requestId);
                    if (record) {
                        record.errmsg = message;
                        $emit('observed', record);
                    }
                }
            };
        }
        const XHRProto = XMLHttpRequest.prototype;
        _replace(XHRProto, 'setRequestHeader', XHRSetRequestHeaderReplacement);
        _replace(XHRProto, 'open', XHROpenReplacement);
        _replace(XHRProto, 'send', XHRSendReplacement);
    }
    install() {
        const { beacon, fetch, xhr } = this.options;
        if (beacon) {
            this.hijackBeacon();
        }
        if (fetch) {
            this.hijackFetch();
        }
        if (xhr) {
            this.hijackXHR();
        }
        _log('http observer ready!');
    }
    uninstall() {
        const { beacon, fetch, xhr } = this.options;
        if (beacon) {
            _recover(window.navigator, 'sendBeacon');
        }
        if (fetch) {
            _recover(window, 'fetch');
        }
        if (xhr) {
            this.hijackBeacon();
        }
    }
}

// CONCATENATED MODULE: ./observers/mutation.ts



class mutation_DOMMutationObserver extends pub_sub_EventDrivenable {
    constructor(options) {
        super();
        if (options === false)
            return;
    }
    process(mutationRecord) {
        try {
            const { target } = mutationRecord;
            if (target && target.tagName === 'SCRIPT')
                return;
            switch (mutationRecord.type) {
                case 'childList': {
                    return this.getNodesRecord(mutationRecord);
                }
                default: {
                    return;
                }
            }
        }
        catch (error) {
            _warn(error);
        }
    }
    getNodesRecord({ addedNodes, removedNodes, }) {
        const { length: isAdd } = addedNodes;
        const { length: isRemove } = removedNodes;
        if (!isAdd && !isRemove)
            return;
        this.nodesFilter(addedNodes).forEach((node) => {
            switch (node.nodeName) {
                case '#text': {
                    break;
                }
                default: {
                    tools_SonyA7R3.bufferNewElement(node);
                }
            }
        });
    }
    nodesFilter(nodeList) {
        return Array.prototype.slice.call(nodeList).filter(node => {
            const { nodeName, tagName } = node;
            return nodeName !== '#comment' && tagName !== 'SCRIPT';
        });
    }
    install() {
        const mutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        this.observer = new mutationObserver((records) => {
            for (let record of records) {
                this.process(record);
            }
        });
        this.observer.observe(document.documentElement, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });
        _log('mutation observer ready!');
    }
    uninstall() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }
}

// CONCATENATED MODULE: ./observers/error.ts




class error_ErrorObserver extends pub_sub_EventDrivenable {
    constructor(options) {
        super();
        this.options = RECORDER_PRESET.error;
        this.getGlobalerrorReocrd = (errevt) => {
            const { message: msg, lineno, colno, error: err, filename: url } = errevt;
            const record = {
                type: ErrorTypes.jserr,
                url,
                line: `${lineno}:${colno}`,
                msg,
                err,
                stack: err.stack
            };
            const { $emit } = this;
            $emit('observed', record, errevt);
        };
        this.getUnhandlerejectionRecord = (errevt) => {
            const reason = errevt.reason || '';
            const record = {
                type: ErrorTypes.unhandledrejection,
                msg: reason,
                stack: reason.stack
            };
            const { $emit } = this;
            $emit('observed', record, errevt);
        };
        if (typeof options === 'boolean' && options === false) {
            return;
        }
        if (typeof options === 'object') {
            this.options = { ...this.options, ...options };
        }
    }
    getStackTeace() {
    }
    installGlobalerrorHandler() {
        const { getGlobalerrorReocrd } = this;
        _replace(window, 'onerror', oldOnerrorHandler => {
            const recorderOnerrorHandler = function (message, filename, lineno, colno, error) {
                if (error && error instanceof ErrorEvent) {
                    getGlobalerrorReocrd(error);
                }
                else if (message instanceof ErrorEvent) {
                    getGlobalerrorReocrd(message);
                }
                else {
                    getGlobalerrorReocrd({
                        message,
                        filename,
                        lineno,
                        colno,
                        error
                    });
                }
                if (oldOnerrorHandler) {
                    oldOnerrorHandler.apply(window, arguments);
                }
            };
            return recorderOnerrorHandler;
        });
    }
    installUnhanldledrejectionHandler() {
        const { getUnhandlerejectionRecord } = this;
        _replace(window, 'onunhandledrejection', originalUnhanldledrejectionHandler => {
            return function (errevt) {
                getUnhandlerejectionRecord(errevt);
                if (originalUnhanldledrejectionHandler) {
                    originalUnhanldledrejectionHandler.call(this, errevt);
                }
            };
        });
    }
    install() {
        const { jserror, unhandledrejection } = this.options;
        if (jserror) {
            this.installGlobalerrorHandler();
            Object.defineProperty(window, 'onerror', {
                set(newHook) {
                    if (!newHook.__recorder__) {
                        _log('recorder error handler died!');
                    }
                }
            });
        }
        if (unhandledrejection) {
            this.installUnhanldledrejectionHandler();
        }
        _log('error observer ready!');
    }
    uninstall() {
        const { jserror, unhandledrejection } = this.options;
        if (jserror) {
            _recover(window, 'onerror');
        }
        if (unhandledrejection) {
            _recover(window, 'onunhandledrejection');
        }
    }
}

// CONCATENATED MODULE: ./observers/history.ts



class history_HistoryObserver extends pub_sub_EventDrivenable {
    constructor(options) {
        super();
        this.status = false;
        if (options === false)
            return;
    }
    getHistoryRecord(from, to) {
        const parsedHref = _parseURL(location.href);
        const parsedTo = _parseURL(to);
        let parsedFrom = _parseURL(from);
        if (!parsedFrom.path) {
            parsedFrom = parsedHref;
        }
        this.lastHref = to;
        const record = {
            type: HistoryTypes.history,
            from: parsedFrom.relative,
            to: parsedTo.relative
        };
        const { $emit } = this;
        $emit('observed', record);
    }
    isSupportHistory() {
        return 'history' in window && !!window.history.pushState && !!window.history.replaceState;
    }
    install() {
        if (!this.isSupportHistory())
            return;
        const { getHistoryRecord } = this;
        const self = this;
        _replace(window, 'onpopstate', function (originalHandler) {
            return function (...args) {
                getHistoryRecord.call(self, self.lastHref, location.href);
                originalHandler && originalHandler.apply(this, args);
            };
        });
        function historyReplacement(originalMethod) {
            return function (...args) {
                const url = args.length > 2 ? args[2] : undefined;
                if (url)
                    getHistoryRecord.call(self, self.lastHref, String(url));
                return originalMethod.apply(this, args);
            };
        }
        _replace(window.history, 'pushState', historyReplacement);
        _replace(window.history, 'replaceState', historyReplacement);
        _log('history installed');
        this.status = true;
    }
    uninstall() {
        _recover(window, 'onpopstate');
        _recover(window.history, 'pushState');
        _recover(window.history, 'replaceState');
        this.status = false;
    }
}

// CONCATENATED MODULE: ./observers/mouse.ts




class mouse_MouseObserver extends pub_sub_EventDrivenable {
    constructor(options) {
        super();
        this.listeners = [];
        this.options = RECORDER_PRESET.mouse;
        this.addListener = ({ target, event, callback, options = false }, cb) => {
            target.addEventListener(event, callback, options);
            this.listeners.push({
                target,
                event,
                callback,
            });
            try {
                cb && cb();
            }
            catch (err) {
                _warn(err);
            }
        };
        this.getMouseClickRecord = (evt) => {
            const { pageX: x, pageY: y } = evt;
            const record = { type: MouseTypes.click, x, y };
            const { $emit } = this;
            $emit("observed", record);
        };
        this.getMouseMoveRecord = (evt) => {
            const { pageX: x, pageY: y } = evt;
            const record = { type: MouseTypes.move, x, y };
            const { $emit } = this;
            $emit("observed", record);
        };
        this.getMouseDblclickRecord = (evt) => {
            const { pageX: x, pageY: y } = evt;
            const record = { type: MouseTypes.dblclick, x, y };
            const { $emit } = this;
            $emit("observed", record);
        };
        this.getMouseRightclickRecord = (evt) => {
            const { pageX: x, pageY: y } = evt;
            const record = { type: MouseTypes.rightClick, x, y };
            const { $emit } = this;
            $emit("observed", record);
        };
        this.getMouseDragRecord = (evt) => {
            const { pageX: x, pageY: y, type } = evt;
            const record = { type: type, x, y };
            const { $emit } = this;
            $emit("observed", record);
        };
        this.getMouseDragDropRecord = (evt) => {
            console.log('getMouseDragDropRecord', evt);
            const { pageX: x, pageY: y, type, dataTransfer } = evt;
            const files = dataTransfer.files;
            const filesTag = [];
            const formData = new FormData();
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                const tag = (file.name || '').split('.')[0] || Math.random()
                    .toString(36)
                    .substring(2);
                formData.append(tag, file);
                filesTag.push(tag);
            }
            formData.append("_id", "628b6d4f1fde64d672cf7769");
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdA.GfxRk-CtH6rXPrQstXkm8pkjEhPFO1h5kFEBciCZN48");
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formData,
                redirect: "follow",
            };
            fetch("http://localhost:7001/records/upload", requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.log("error", error));
            const record = {
                type: type,
                x,
                y,
                tag: filesTag,
            };
            const { $emit } = this;
            $emit("observed", record);
        };
        if (typeof options === "boolean" && options === false) {
            return;
        }
        if (typeof options === "object") {
            this.options = { ...this.options, ...options };
        }
    }
    install() {
        const { addListener } = this;
        const { click, mousemove, dblclick, rightClick, drag } = this.options;
        if (click) {
            addListener({
                target: document,
                event: "click",
                callback: this.getMouseClickRecord,
            });
        }
        if (mousemove) {
            addListener({
                target: document,
                event: "mousemove",
                callback: _throttle(this.getMouseMoveRecord, 50),
            });
        }
        if (dblclick) {
            addListener({
                target: document,
                event: "dblclick",
                callback: this.getMouseDblclickRecord,
            });
        }
        if (rightClick) {
            addListener({
                target: document,
                event: "contextmenu",
                callback: this.getMouseRightclickRecord,
            });
        }
        if (drag) {
            addListener({
                target: document,
                event: "dragstart",
                callback: this.getMouseDragRecord,
            });
            addListener({
                target: document,
                event: "drag",
                callback: _throttle(this.getMouseDragRecord, 50),
            });
            addListener({
                target: document,
                event: "dragenter",
                callback: this.getMouseDragRecord,
            });
            addListener({
                target: document,
                event: "dragover",
                callback: _throttle(this.getMouseDragRecord, 50),
            });
            addListener({
                target: document,
                event: "drop",
                callback: this.getMouseDragDropRecord,
            });
            addListener({
                target: document,
                event: "dragend",
                callback: this.getMouseDragRecord,
            });
            addListener({
                target: document,
                event: "dragleave",
                callback: this.getMouseDragRecord,
            });
        }
        _log("mouse observer ready!");
    }
    uninstall() {
        this.listeners.forEach(({ target, event, callback }) => {
            target.removeEventListener(event, callback);
        });
    }
}

// CONCATENATED MODULE: ./tools/ui.ts
function createUI({ stopEvent }) {
    let ele = document.createElement('div');
    ele.setAttribute('id', 'y-record');
    ele.innerHTML = `    <div id="y-record-send" style="position: fixed;z-index: 999999;bottom: 20px;right: 10px; width: 150px;">
  <div id="y-record-content" style="display: flex;align-items: center;cursor: pointer;">
      <svg id="y-record-svg" t="1653461226743" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1431" width="40" height="40"><path d="M940 512H792V412c76.8 0 139-62.2 139-139 0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 34.8-28.2 63-63 63H232c-34.8 0-63-28.2-63-63 0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 76.8 62.2 139 139 139v100H84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h148v96c0 6.5 0.2 13 0.7 19.3C164.1 728.6 116 796.7 116 876c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-44.2 23.9-82.9 59.6-103.7 6 17.2 13.6 33.6 22.7 49 24.3 41.5 59 76.2 100.5 100.5 28.9 16.9 61 28.8 95.3 34.5 4.4 0 8-3.6 8-8V484c0-4.4 3.6-8 8-8h60c4.4 0 8 3.6 8 8v464.2c0 4.4 3.6 8 8 8 34.3-5.7 66.4-17.6 95.3-34.5 41.5-24.3 76.2-59 100.5-100.5 9.1-15.5 16.7-31.9 22.7-49C812.1 793.1 836 831.8 836 876c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-79.3-48.1-147.4-116.7-176.7 0.4-6.4 0.7-12.8 0.7-19.3v-96h148c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" p-id="1432" fill="#8C1815"></path><path d="M304 280h416c4.4 0 8-3.6 8-8 0-40-8.8-76.7-25.9-108.1-17.2-31.5-42.5-56.8-74-74C596.7 72.8 560 64 520 64h-16c-40 0-76.7 8.8-108.1 25.9-31.5 17.2-56.8 42.5-74 74C304.8 195.3 296 232 296 272c0 4.4 3.6 8 8 8z" p-id="1433" fill="#8C1815"></path></svg>
      <span id="y-record-span"  style="color: #8C1815;margin-left: 10px;"> BUG 上传</span>
  </div>
</div>    `;
    document.body.appendChild(ele);
    const btn = document.getElementById('y-record-send');
    btn.addEventListener('click', () => {
        alert('数据序列已上传至服务器');
        stopEvent();
    });
}

// CONCATENATED MODULE: ./observers/keyboard.ts




class keyboard_KeyboardObserver extends pub_sub_EventDrivenable {
    constructor(options) {
        super();
        this.listeners = [];
        this.options = RECORDER_PRESET.Keyboard;
        this.addListener = ({ target, event, callback, options = false }, cb) => {
            target.addEventListener(event, callback, options);
            this.listeners.push({
                target,
                event,
                callback
            });
            try {
                cb && cb();
            }
            catch (err) {
                _warn(err);
            }
        };
        this.getKeypressRecord = (evt) => {
            const { key } = evt;
            const record = { type: KeyboardTypes.keypress, key };
            const { $emit } = this;
            $emit('observed', record);
        };
        if (typeof options === 'boolean' && options === false) {
            return;
        }
        if (typeof options === 'object') {
            this.options = { ...this.options, ...options };
        }
    }
    install() {
        const { addListener } = this;
        const { keypress } = this.options;
        if (keypress) {
            addListener({
                target: document,
                event: 'keypress',
                callback: _throttle(this.getKeypressRecord, 50)
            });
        }
        _log('keyboard observer ready!');
    }
    uninstall() {
        this.listeners.forEach(({ target, event, callback }) => {
            target.removeEventListener(event, callback);
        });
    }
}

// CONCATENATED MODULE: ./index.ts












class index_SessionRecorder {
    constructor(options) {
        this.observers = {
            mutation: null,
            console: null,
            event: null,
            mouse: null,
            keyboard: null,
            error: null,
            history: null,
            http: null
        };
        this.options = RECORDER_PRESET;
        this.trail = [];
        this.recording = false;
        this.baseTime = 0;
        this.lastSnapshot = {
            time: 0,
            index: 0
        };
        this.observeScroll = (ele) => {
            if (ele) {
                ele.addEventListener('scroll', _throttle(this.observers.event.getScrollRecord));
            }
            else {
                _warn("Element doesn't existsed!");
            }
        };
        this.pushToTrail = (record) => {
            if (!this.recording)
                return;
            const thisRecordTime = _now() - this.baseTime;
            record = { t: thisRecordTime, ...record };
            const { time: lastSnapshotTime, index: lastSnapshotIndex } = this.lastSnapshot;
            if (thisRecordTime - lastSnapshotTime >= this.options.maxTimeSpan / 2) {
                if (lastSnapshotIndex !== 0) {
                    this.trail = this.trail.slice(lastSnapshotIndex);
                }
                const snapshotRecord = this.getSnapshotRecord();
                this.trail.push(snapshotRecord);
            }
            this.trail.push(record);
        };
        this.start = () => {
            if (this.recording) {
                _warn('record already started');
                return;
            }
            this.recording = true;
            this.baseTime = _now();
            this.trail[0] = this.getSnapshotRecord();
            Object.keys(this.observers).forEach(observerName => {
                if (this.options[observerName]) {
                    ;
                    this.observers[observerName].install();
                }
            });
            window.SessionRecorder = this;
        };
        this.stop = () => {
            if (!this.recording) {
                _warn('record not started');
                return;
            }
            this.recording = false;
            this.trail.length = 0;
        };
        this.uninstallObservers = () => {
            Object.keys(this.observers).forEach(observerName => {
                ;
                this.observers[observerName].uninstall();
            });
        };
        if (options && typeof options === 'object') {
            this.options = { ...this.options, ...options };
        }
        const { mutation, history, http, event, error, console: consoleOptions, mouse, Keyboard } = this.options;
        this.observers = {
            mutation: new mutation_DOMMutationObserver(mutation),
            http: new http_HttpObserver(http),
            console: new console_ConsoleObserver(consoleOptions),
            event: new event_EventObserver(event),
            mouse: new mouse_MouseObserver(mouse),
            error: new error_ErrorObserver(error),
            history: new history_HistoryObserver(history),
            keyboard: new keyboard_KeyboardObserver(Keyboard)
        };
        Object.keys(this.observers).forEach((observerName) => {
            const observer = this.observers[observerName];
            observer.$on('observed', this.pushToTrail.bind(this));
        });
    }
    getSnapshotRecord() {
        this.lastSnapshot.time = _now() - (this.baseTime || _now());
        this.lastSnapshot.index = this.trail.length;
        const { clientWidth: w, clientHeight: h } = document.documentElement;
        const { x, y } = this.observers.event.getScrollPosition();
        return {
            t: this.lastSnapshot.time,
            type: 'snapshot',
            scroll: { x, y },
            location: window.location,
            resize: {
                w,
                h
            },
            snapshot: tools_SonyA7R3.takeSnapshotForPage()
        };
    }
}
const recorder = new index_SessionRecorder();
let startUrl = window.location.href;
let originUrl = window.location.origin;
const fetchEvent = ({ url, method = 'POST', body }) => {
    return window.fetch(url, {
        "method": method,
        "headers": {
            "user-agent": "vscode-restclient",
            "content-type": "application/json",
            "authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdA.GfxRk-CtH6rXPrQstXkm8pkjEhPFO1h5kFEBciCZN48"
        },
        "body": JSON.stringify(body)
    });
};
const channel = new BroadcastChannel('y_record');
const playEvent = () => {
    recorder.start();
};
const stopEvent = () => {
    console.log(recorder.trail);
    channel.postMessage('upload');
    fetchEvent({ url: "http://localhost:7001/records/update", body: {
            _id: '628b6d4f1fde64d672cf7769',
            snapshot: {
                name: 'test',
                data: recorder.trail,
            },
            storage: {
                localStorage_record: localStorage,
                sessionStorage_record: sessionStorage
            },
            location: {
                startUrl: startUrl,
                originUrl: originUrl
            }
        } });
    recorder.stop();
};
const init = async () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/yrecord_sw.js', { scope: '/' });
    }
    playEvent();
    createUI({ stopEvent });
};
init();


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map