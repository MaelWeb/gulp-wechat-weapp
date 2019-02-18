/* eslint-disable */
/*!
 * wxpage v1.1.8
 * https://github.com/tvfe/wxpage
 * License MIT
 */
module.exports =
    /** *** */
    (function (modules) { // webpackBootstrap
        /** *** */ // The module cache
        /** *** */
        const installedModules = {};
        /** *** */
        /** *** */ // The require function
        /** *** */
        function __webpack_require__(moduleId) {
            /** *** */
            /** *** */ // Check if module is in cache
            /** *** */
            if (installedModules[moduleId]) {
                /** *** */
                return installedModules[moduleId].exports;
                /** *** */
            }
            /** *** */ // Create a new module (and put it into the cache)
            /** *** */
            const module = installedModules[moduleId] = {
                /** *** */
                i: moduleId,
                /** *** */
                l: false,
                /** *** */
                exports: {},
                /** *** */
            };
            /** *** */
            /** *** */ // Execute the module function
            /** *** */
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /** *** */
            /** *** */ // Flag the module as loaded
            /** *** */
            module.l = true;
            /** *** */
            /** *** */ // Return the exports of the module
            /** *** */
            return module.exports;
            /** *** */
        }
        /** *** */
        /** *** */
        /** *** */ // expose the modules object (__webpack_modules__)
        /** *** */
        __webpack_require__.m = modules;
        /** *** */
        /** *** */ // expose the module cache
        /** *** */
        __webpack_require__.c = installedModules;
        /** *** */
        /** *** */ // identity function for calling harmony imports with the correct context
        /** *** */
        __webpack_require__.i = function (value) { return value; };
        /** *** */
        /** *** */ // define getter function for harmony exports
        /** *** */
        __webpack_require__.d = function (exports, name, getter) {
            /** *** */
            if (!__webpack_require__.o(exports, name)) {
                /** *** */
                Object.defineProperty(exports, name, {
                    /** *** */
                    configurable: false,
                    /** *** */
                    enumerable: true,
                    /** *** */
                    get: getter,
                    /** *** */
                });
                /** *** */
            }
            /** *** */
        };
        /** *** */
        /** *** */ // getDefaultExport function for compatibility with non-harmony modules
        /** *** */
        __webpack_require__.n = function (module) {
            /** *** */
            const getter = module && module.__esModule
                /** *** */
                ? function getDefault() { return module.default; }
                /** *** */
                : function getModuleExports() { return module; };
            /** *** */
            __webpack_require__.d(getter, 'a', getter);
            /** *** */
            return getter;
            /** *** */
        };
        /** *** */
        /** *** */ // Object.prototype.hasOwnProperty.call
        /** *** */
        __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
        /** *** */
        /** *** */ // __webpack_public_path__
        /** *** */
        __webpack_require__.p = '';
        /** *** */
        /** *** */ // Load entry module and return exports
        /** *** */
        return __webpack_require__(__webpack_require__.s = 7);
        /** *** */
    }([
    /* 0 */
    /** */
    (function (module, exports, __webpack_require__) {
        const undef = void (0);

        function hasOwn(obj, prop) {
            return obj && obj.hasOwnProperty && obj.hasOwnProperty(prop);
        }

        function _nextTick() {
            // global
            const ctx = this;
            return function () {
                return setTimeout.apply(ctx, arguments);
            };
        }
        var fns = {
            type(obj) {
                if (obj === null) return 'null';
                else if (obj === undef) return 'undefined';
                const m = /\[object (\w+)\]/.exec(Object.prototype.toString.call(obj));
                return m ? m[1].toLowerCase() : '';
            },
            extend(obj) {
                if (fns.type(obj) != 'object' && fns.type(obj) != 'function') return obj;
                let source; let prop;
                for (let i = 1, { length } = arguments; i < length; i++) {
                    source = arguments[i];
                    for (prop in source) {
                        if (hasOwn(source, prop)) {
                            obj[prop] = source[prop];
                        }
                    }
                }
                return obj;
            },
            objEach(obj, fn) {
                if (!obj) return;
                for (const key in obj) {
                    if (hasOwn(obj, key)) {
                        if (fn(key, obj[key]) === false) break;
                    }
                }
            },
            nextTick: _nextTick(),
            /**
             * Lock function before lock release
             */
            lock: function lock(fn) {
                let pending;
                return function () {
                    if (pending) return;
                    pending = true;
                    const args = [].slice.call(arguments, 0);
                    args.unshift(() => {
                        pending = false;
                    });
                    return fn.apply(this, args);
                };
            },
            /**
             * Queue when pending, execute one by one
             * @param {Function} fn executed function
             * @param {Number} capacity Allow run how much parall task at once
             * @async
             */
            queue: function queue(fn, capacity) {
                capacity = capacity || 1;
                const callbacks = [];
                let remains = capacity;

                function next() {
                    const item = callbacks.shift();
                    if (!item) {
                        remains = capacity;
                        return;
                    }
                    remains--;
                    const fn = item[0];
                    const ctx = item[1];
                    const args = item[2];
                    args.unshift(function () {
                        // once task is done, remains increasing
                        remains++;
                        // then check or call next task
                        next.apply(this, arguments);
                    });
                    fns.nextTick(() => fn.apply(ctx, args));
                }
                return function () {
                    callbacks.push([fn, this, [].slice.call(arguments, 0)]);
                    if (!remains) return;
                    return next();
                };
            },
            /**
             * Queue and wait for the same result
             * @param {Function} delegate method
             * @return {Function} the method receive a callback function
             */
            delegator(fn) {
                let pending;
                const queue = [];
                return function (cb) {
                    if (pending) return queue.push(cb);
                    pending = true;
                    fn.call(this, function () {
                        pending = false;
                        const ctx = this;
                        const args = arguments;
                        cb && cb.apply(ctx, args);
                        queue.forEach((f) => {
                            f && f.apply(ctx, args);
                        });
                    });
                };
            },
            /**
             * Call only once
             */
            once(fn /* [, ctx] */) {
                const args = arguments;
                let called;
                return function () {
                    if (called || !fn) return;
                    called = true;
                    return fn.apply(args.length >= 2 ? args[1] : null, arguments);
                };
            },
            /**
             *  解析 query 字符串
             * */
            queryParse(search, spliter) {
                if (!search) return {};

                spliter = spliter || '&';

                const query = search.replace(/^\?/, '');
                    const queries = {};
                    const splits = query ? query.split(spliter) : null;

                if (splits && splits.length > 0) {
                    splits.forEach((item) => {
                        item = item.split('=');
                        const key = item.splice(0, 1);
                            const value = item.join('=');
                        queries[key] = value;
                    });
                }
                return queries;
            },
            /**
             * URL添加query
             */
            queryJoin(api, queries, unencoded) {
                const qs = fns.queryStringify(queries, '&', unencoded);
                if (!qs) return api;

                let sep;
                if (/[\?&]$/.test(api)) {
                    sep = '';
                } else if (~api.indexOf('?')) {
                    sep = '&';
                } else {
                    sep = '?';
                }
                return api + sep + qs;
            },
            /**
             * query 对象转换字符串
             */
            queryStringify(params, spliter, unencoded) {
                if (!params) return '';
                return Object.keys(params).map((k) => {
                    const v = params[k];
                    return `${k}=${unencoded ? v : encodeURIComponent(v)}`;
                }).join(spliter || '&');
            },
            wrapFun(pre, wrapper) {
                return function () {
                    try {
                        wrapper && wrapper.apply(this, arguments);
                    } finally {
                        pre && pre.apply(this, arguments);
                    }
                };
            },
        };

        module.exports = fns;


        /** */
    }),
    /* 1 */
    /** */
    (function (module, exports, __webpack_require__) {
        const fns = __webpack_require__(0);
        const sessionId = +new Date();
        const sessionKey = 'session_';
        console.log('[Session] Current ssid:', sessionId);
        var cache = {
            session: {
                set(k, v, asyncCB) {
                    return cache.set(sessionKey + k, v, -1 * sessionId, asyncCB);
                },
                get(k, asyncCB) {
                    return cache.get(sessionKey + k, asyncCB);
                },
            },
            /**
             * setter
             * @param {String} k      key
             * @param {Object} v      value
             * @param {Number} expire 过期时间，毫秒，为负数的时候表示为唯一session ID，为 true 表示保持上一次缓存时间
             * @param {Function} asyncCB optional, 是否异步、异步回调方法
             */
            set(k, v, expire, asyncCB) {
                if (fns.type(expire) == 'function') {
                    asyncCB = expire;
                    expire = 0;
                } else if (asyncCB && fns.type(asyncCB) != 'function') {
                    asyncCB = noop;
                }
                const data = {
                    expr: 0,
                    data: v,
                };
                let expireTime;
                /**
                 * 保持上次缓存时间
                 */
                if (expire === true) {
                    const _cdata = wx.getStorageSync(`_cache_${k}`);
                    // 上次没有缓存，本次也不更新
                    if (!_cdata) return;
                    // 使用上次过期时间
                    data.expr = _cdata.expr || 0;
                    expireTime = 1;
                }
                if (!expireTime) {
                    expire = expire || 0;
                    if (expire > 0) {
                        const t = +new Date();
                        expire += t;
                    }
                    data.expr = +expire;
                }
                /**
                 * 根据异步方法决定同步、异步更新
                 */
                if (asyncCB) {
                    wx.setStorage({
                        key: `_cache_${k}`,
                        data,
                        success() {
                            asyncCB();
                        },
                        fail(e) {
                            asyncCB(e || `set "${k}" fail`);
                        },
                    });
                } else {
                    wx.setStorageSync(`_cache_${k}`, data);
                }
            },
            /**
             * getter
             * @param {String} k      key
             * @param {Function} asyncCB optional, 是否异步、异步回调方法
             */
            get(k, asyncCB) {
                if (asyncCB) {
                    if (fns.type(asyncCB) != 'function') asyncCB = noop;
                    const errMsg = `get "${k}" fail`;
                    wx.getStorage({
                        key: `_cache_${k}`,
                        success(data) {
                            if (data && data.data) {
                                asyncCB(null, _resolve(k, data.data));
                            } else {
                                asyncCB(data ? data.errMsg || errMsg : errMsg);
                            }
                        },
                        fail(e) {
                            asyncCB(e || errMsg);
                        },
                    });
                } else {
                    return _resolve(k, wx.getStorageSync(`_cache_${k}`));
                }
            },
        };

        function _resolve(k, v) {
            if (!v) return null;
            // 永久存储
            if (!v.expr) return v.data;
            else if (v.expr < 0 && -1 * v.expr == sessionId) {
                    // session
                    return v.data;
                } else if (v.expr > 0 && new Date() < v.expr) {
                    // 普通存储
                    return v.data;
                } else {
                    wx.removeStorage({
                        key: k,
                    });
                    return null;
                }
        }

        function noop() {}
        module.exports = cache;


        /** */
    }),
    /* 2 */
    /** */
    (function (module, exports, __webpack_require__) {
        const fns = __webpack_require__(0);
        const _conf = {
            nameResolve() {},
        };
        module.exports = {
            set(k, v) {
                switch (k) {
                    case 'resolvePath':
                        if (fns.type(v) == 'function') {
                            _conf.customRouteResolve = v;
                        }
                        break;
                    case 'route':
                        const t = fns.type(v);
                        if (t == 'string' || t == 'array') {
                            let routes = (t == 'string' ? [v] : v);
                            const mainRoute = routes[0];
                            routes = routes.map(item => new RegExp(`^${item
                                    .replace(/^\/?/, '/?')
                                    .replace(/[\.]/g, '\\.')
                                    .replace('$page', '([\\w\\-]+)')}`));
                            _conf.routeResolve = function (name) {
                                return mainRoute.replace('$page', name);
                            };
                            _conf.nameResolve = function (url) {
                                let n = '';
                                routes.some((reg) => {
                                    const m = reg.exec(url);
                                    if (m) {
                                        n = m[1];
                                        return true;
                                    }
                                });
                                return n;
                            };
                        } else {
                            console.error('Illegal routes option:', v);
                        }
                        break;
                    default:
                        _conf[k] = v;
                }
            },
            get(k) {
                return _conf[k];
            },
        };


        /** */
    }),
    /* 3 */
    /** */
    (function (module, exports, __webpack_require__) {
        /**
         *  Simple Pub/Sub module
         *  @tencent/message and 减掉fns依赖
         * */


        function Message() {
            this._evtObjs = {};
        }
        Message.prototype.on = function (evtType, handler, _once) {
            if (!this._evtObjs[evtType]) {
                this._evtObjs[evtType] = [];
            }
            this._evtObjs[evtType].push({
                handler,
                once: _once,
            });
            const that = this;
            return function () {
                that.off(evtType, handler);
            };
        };
        Message.prototype.off = function (evtType, handler) {
            let types;
            if (evtType) {
                types = [evtType];
            } else {
                types = Object.keys(this._evtObjs);
            }
            const that = this;
            types.forEach((type) => {
                if (!handler) {
                    // remove all
                    that._evtObjs[type] = [];
                } else {
                    const handlers = that._evtObjs[type] || [];
                        const nextHandlers = [];

                    handlers.forEach((evtObj) => {
                        if (evtObj.handler !== handler) {
                            nextHandlers.push(evtObj);
                        }
                    });
                    that._evtObjs[type] = nextHandlers;
                }
            });

            return this;
        };
        Message.prototype.emit = function (evtType) {
            const args = Array.prototype.slice.call(arguments, 1);

            const handlers = this._evtObjs[evtType] || [];
            handlers.forEach((evtObj) => {
                if (evtObj.once && evtObj.called) return;
                evtObj.called = true;
                try {
                    evtObj.handler && evtObj.handler.apply(null, args);
                } catch (e) {
                    console.error(e.stack || e.message || e);
                }
            });
        };
        Message.prototype.assign = function (target) {
            const msg = this;
            ['on', 'off', 'emit', 'assign'].forEach((name) => {
                const method = msg[name];
                target[name] = function () {
                    return method.apply(msg, arguments);
                };
            });
        }
        /**
         *  Global Message Central
         * */
        ;
        (new Message()).assign(Message);
        module.exports = Message;


        /** */
    }),
    /* 4 */
    /** */
    (function (module, exports, __webpack_require__) {
        /**
         * 对wx.navigateTo、wx.redirectTo、wx.navigateBack的包装，在它们的基础上添加了事件
         */
        const Message = __webpack_require__(3);
        const exportee = module.exports = new Message();
        let timer; let readyTimer; let
pending;

        exportee.on('page:ready', () => {
            readyTimer = setTimeout(() => {
                pending = false;
            }, 100);
        });

        function route(type, cfg, args) {
            if (pending) return;
            pending = true;
            clearTimeout(timer);
            clearTimeout(readyTimer);
            /**
             * 2s内避免重复的跳转
             */
            timer = setTimeout(() => {
                pending = false;
            }, 2000);
            exportee.emit('navigateTo', cfg.url);

            // 会存在不兼容接口，例如：reLaunch
            if (wx[type]) {
                return wx[type].apply(wx, args);
            }
        }
        exportee.navigateTo = function (cfg) {
            return route('navigateTo', cfg, arguments);
        };
        exportee.redirectTo = function (cfg) {
            return route('redirectTo', cfg, arguments);
        };
        exportee.switchTab = function (cfg) {
            return route('switchTab', cfg, arguments);
        };
        exportee.reLaunch = function (cfg) {
            return route('reLaunch', cfg, arguments);
        };
        exportee.navigateBack = function () {
            return wx.navigateBack.apply(wx, arguments);
        };


        /** */
    }),
    /* 5 */
    /** */
    (function (module, exports, __webpack_require__) {
        const cache = __webpack_require__(1);
        const redirector = __webpack_require__(4);
        const conf = __webpack_require__(2);
        const fns = __webpack_require__(0);
        const navigate = route({ type: 'navigateTo' });
        const redirect = route({ type: 'redirectTo' });
        const switchTab = route({ type: 'switchTab' });
        const reLaunch = route({ type: 'reLaunch' });
        const routeMethods = { navigate, redirect, switchTab, reLaunch };
        const bindNavigate = clickDelegate('navigate');
        const bindRedirect = clickDelegate('redirect');
        const bindSwitch = clickDelegate('switchTab');
        const bindReLaunch = clickDelegate('reLaunch');
        const channel = {};
        let dispatcher;
        let getRef;

        module.exports = {
            channel,
            dispatcher(d) {
                dispatcher = d;
            },
            ref(fn) {
                getRef = fn;
            },
            mount(e) {
                const payload = e.detail;
                switch (payload.type) {
                    case 'attached':
                        const ref = getRef && getRef(payload.id);
                        if (!ref) return;

                        const refName = ref._$ref;
                        if (refName && this.$refs) {
                            this.$refs[refName] = ref;
                        }
                        ref._$attached(this);
                        break;
                    case 'event:call':
                        const method = this[payload.method];
                        method && method.apply(this, payload.args);
                    default:
                        break;
                }
            },
            redirectDelegate(emitter, dispatcher) {
                ['navigateTo', 'redirectTo', 'switchTab', 'reLaunch'].forEach((k) => {
                    emitter.on(k, (url) => {
                        const name = getPageName(url);
                        name && dispatcher.emit(`${k}:${name}`, url, fns.queryParse(url.split('?')[1]));
                    });
                });
            },
            methods(ctx) {
                /**
                 * 缓存
                 */
                ctx.$cache = cache;
                ctx.$session = cache.session;
                /**
                 * 存一次，取一次
                 */
                ctx.$put = put;
                /**
                 * 只能被取一次
                 */
                ctx.$take = take;
                /**
                 * 实例引用集合
                 */
                ctx.$refs = {};

                /**
                 * 路由方法
                 */
                ctx.$route = ctx.$navigate = navigate;
                ctx.$redirect = redirect;
                ctx.$switch = switchTab;
                ctx.$launch = reLaunch;
                ctx.$back = back;
                /**
                 * 页面预加载
                 */
                ctx.$preload = preload;
                /**
                 * 点击跳转代理
                 */
                ctx.$bindRoute = ctx.$bindNavigate = bindNavigate;
                ctx.$bindRedirect = bindRedirect;
                ctx.$bindSwitch = bindSwitch;
                ctx.$bindReLaunch = bindReLaunch;
                /**
                 * 页面信息
                 */
                ctx.$curPage = getPage;
                ctx.$curPageName = curPageName;
            },
            getPageName,
        };
        /**
         * Navigate handler
         */
        function route({ type }) {
            // url: $page[?name=value]
            return function (url, config) {
                const parts = url.split(/\?/);
                let pagepath = parts[0];
                if (/^[\w\-]+$/.test(pagepath)) {
                    pagepath = (conf.get('customRouteResolve') || conf.get('routeResolve'))(pagepath);
                }
                if (!pagepath) {
                    throw new Error('Invalid path:', pagepath);
                }
                config = config || {};
                // append querystring
                config.url = pagepath + (parts[1] ? `?${parts[1]}` : '');
                redirector[type](config);
            };
        }

        function clickDelegate(type) {
            const _route = routeMethods[type];
            return function (e) {
                if (!e) return;
                const { dataset } = e.currentTarget;
                const { before } = dataset;
                const { after } = dataset;
                const { url } = dataset;
                const ctx = this;
                try {
                    if (ctx && before && ctx[before]) ctx[before].call(ctx, e);
                } finally {
                    if (!url) return;
                    _route(url);
                    if (ctx && after && ctx[after]) ctx[after].call(ctx, e);
                }
            };
        }

        function back(delta) {
            wx.navigateBack({
                delta: delta || 1,
            });
        }

        function preload(url) {
            const name = getPageName(url);
            name && dispatcher && dispatcher.emit(`preload:${name}`, url, fns.queryParse(url.split('?')[1]));
        }

        function getPage() {
            return getCurrentPages().slice(0).pop();
        }

        function getPageName(url) {
            const m = /^[\w\-]+(?=\?|$)/.exec(url);
            return m ? m[0] : conf.get('nameResolve')(url);
        }

        function curPageName() {
            const { route } = getPage();
            if (!route) return '';
            return getPageName(route);
        }

        function put(key, value) {
            channel[key] = value;
            return this;
        }

        function take(key) {
            const v = channel[key];
            // 释放引用
            channel[key] = null;
            return v;
        }


        /** */
    }),
    /* 6 */
    /** */
    (function (module, exports, __webpack_require__) {
        const fns = __webpack_require__(0);
        const bridge = __webpack_require__(5);
        const cache = __webpack_require__(1);
        const conf = __webpack_require__(2);
        const redirector = __webpack_require__(4);
        const message = __webpack_require__(3);
        const modules = {
            fns,
            redirector,
            cache,
            message,
            dispatcher,
            channel: bridge.channel,
        };
        let dispatcher;
        /**
         * Component constructor
         */
        const refs = {};
        let cid = 0;

        function component(def) {
            if (!def) {
                console.error('Illegal component options.');
                def = {};
            }
            // extend page config
            const extendComponentBefore = conf.get('extendComponentBefore');
            extendComponentBefore && extendComponentBefore(def, modules);

            def.created = fns.wrapFun(def.created, function () {
                bridge.methods(this, dispatcher);
            });
            def.attached = fns.wrapFun(def.attached, function () {
                const id = ++cid;
                this.$id = id;
                refs[id] = this;
                this._$ref = this.properties.ref || this.properties._ref;
                this.triggerEvent('ing', {
                    id: this.$id,
                    type: 'attached',
                });
            });
            def.detached = fns.wrapFun(def.detached, function () {
                delete refs[this.$id];
                const $refs = this.$parent && this.$parent.$refs;
                const refName = this._$ref;
                if (refName && $refs) {
                    delete $refs[refName];
                }
                this.$parent = null;
            });
            def.properties = fns.extend({}, def.properties, {
                ref: {
                    type: String,
                    value: '',
                    observer(next) {
                        /**
                         * 支持动态 ref
                         */
                        if (this._$ref !== next) {
                            const $refs = this.$parent && this.$parent.$refs;
                            if ($refs) {
                                const ref = $refs[this._$ref];
                                delete $refs[this._$ref];
                                this._$ref = next;
                                if (ref && next) {
                                    $refs[next];
                                }
                            }
                        }
                    },
                },
            });
            def.methods = fns.extend({}, def.methods, {
                // 与旧的一致
                $set() {
                    return this.setData.apply(this, arguments);
                },
                $data() {
                    return this.data;
                },
                $emit() {
                    if (!dispatcher) return;
                    return dispatcher.emit.apply(dispatcher, arguments);
                },
                $on() {
                    if (!dispatcher) return function () {};
                    return dispatcher.on.apply(dispatcher, arguments);
                },
                $off() {
                    if (!dispatcher) return;
                    return dispatcher.off.apply(dispatcher, arguments);
                },
                $call(method) {
                    const args = [].slice.call(arguments, 1);
                    this.triggerEvent('ing', {
                        id: this.$id,
                        type: 'event:call',
                        method,
                        args,
                    });
                },
                /**
                 * 由父组件调用
                 */
                _$attached(parent) {
                    this.$root = parent.$root || parent;
                    this.$parent = parent;
                },
                $: bridge.mount,
            });
            Component(def);
        }
        component.getRef = function (id) {
            return refs[id];
        };
        bridge.ref(component.getRef);
        component.dispatcher = function (d) {
            dispatcher = d;
        };
        Component.C = component;
        module.exports = component;


        /** */
    }),
    /* 7 */
    /** */
    (function (module, exports, __webpack_require__) {
        const fns = __webpack_require__(0);
        const message = __webpack_require__(3);
        const redirector = __webpack_require__(4);
        const cache = __webpack_require__(1);
        const C = __webpack_require__(6);
        const bridge = __webpack_require__(5);
        const _conf = __webpack_require__(2);
        const dispatcher = new message();
        let hasPageLoaded = 0;
        let isAppLaunched = 0;
        let isAppShowed = 0;
        let hideTime = 0;
        const modules = {
            fns,
            redirector,
            cache,
            message,
            dispatcher,
            channel: bridge.channel,
        };
        bridge.ref(C.getRef);
        bridge.dispatcher(dispatcher);
        C.dispatcher(dispatcher);

        function WXPage(name, option) {
            if (fns.type(name) == 'object') {
                option = name;
                name = option.name || '_unknow';
            }
            // page internal message
            const emitter = new message();

            // extend page config
            const extendPageBefore = _conf.get('extendPageBefore');
            extendPageBefore && extendPageBefore(name, option, modules);

            // mixin component defs
            // C.use(option, option.comps, `Page[${name}]`, emitter)
            if (option.onNavigate) {
                const onNavigateHandler = function (url, query) {
                    option.onNavigate({ url, query });
                };
                console.log(`Page[${name}] define "onNavigate".`);
                dispatcher.on(`navigateTo:${name}`, onNavigateHandler);
                dispatcher.on(`redirectTo:${name}`, onNavigateHandler);
                dispatcher.on(`switchTab:${name}`, onNavigateHandler);
                dispatcher.on(`reLaunch:${name}`, onNavigateHandler);
            }
            /**
             * Preload lifecycle method
             */
            if (option.onPreload) {
                console.log(`Page[${name}] define "onPreload".`);
                dispatcher.on(`preload:${name}`, (url, query) => {
                    option.onPreload({ url, query });
                });
            }
            /**
             * Instance props
             */
            option.$state = {
                // 是否小程序被打开首页启动页面
                firstOpen: false,
            };
            option.$emitter = emitter;
            bridge.methods(option);

            /**
             * Cross pages message methods
             */
            option.$on = function () {
                return dispatcher.on.apply(dispatcher, arguments);
            };
            option.$emit = function () {
                return dispatcher.emit.apply(dispatcher, arguments);
            };
            option.$off = function () {
                return dispatcher.off.apply(dispatcher, arguments);
            };
            /**
             * 父子通信枢纽模块
             */
            option.$ = bridge.mount;
            /**
             * setData wrapper, for component setData with prefix
             * @param {String} prefix prefix of component's data
             * @param {Object} data
             */
            option.$setData = function (prefix, data) {
                if (fns.type(prefix) == 'string') {
                    const props = {};
                    fns.objEach(data, (k, v) => {
                        props[`${prefix}.${k}`] = v;
                    });
                    return this.setData(props);
                } else if (fns.type(prefix) == 'object') {
                    return this.setData(prefix);
                }
            };
            /**
             * AOP life-cycle methods hook
             */
            option.onLoad = fns.wrapFun(option.onLoad, function () {
                // After onLoad, onAwake is valid if defined
                option.onAwake && message.on('app:sleep', (t) => {
                    option.onAwake.call(this, t);
                });
                if (!hasPageLoaded) {
                    hasPageLoaded = true;

                    const { $state } = this;
                    $state.firstOpen = true;
                }
            });
            option.onReady = fns.wrapFun(option.onReady, () => {
                redirector.emit('page:ready');
            });

            // call on launch
            if (option.onPageLaunch) {
                option.onPageLaunch();
            }
            if (option.onAppLaunch) {
                isAppLaunched ? option.onAppLaunch.apply(option, isAppLaunched) : dispatcher.on('app:launch', (args) => {
                    option.onAppLaunch.apply(option, args);
                });
            }
            if (option.onAppShow) {
                isAppLaunched ? option.onAppShow.apply(option, isAppLaunched) : dispatcher.on('app:show', (args) => {
                    option.onAppShow.apply(option, args);
                });
            }

            // extend page config
            const extendPageAfter = _conf.get('extendPageAfter');
            extendPageAfter && extendPageAfter(name, option, modules);
            // register page
            Page(option);
            return option;
        }
        /**
         * 由重定向模块转发到页面内派发器
         */
        bridge.redirectDelegate(redirector, dispatcher);
        /**
         * Application wrapper
         */
        function Application(option) {
            if (!option.config || !option.config.route || !option.config.route.length) {
                throw new Error('config.route is necessary !');
            }
            if (option.config) {
                WXPage.config(option.config);
            }
            let ctx = option;
            /**
             * APP sleep logical
             */
            option.onShow = option.onShow ? fns.wrapFun(option.onShow, appShowHandler) : appShowHandler;
            option.onHide = option.onHide ? fns.wrapFun(option.onHide, appHideHandler) : appHideHandler;
            option.onLaunch = option.onLaunch ? fns.wrapFun(option.onLaunch, appLaunchHandler) : appLaunchHandler;
            option.onLaunch = fns.wrapFun(option.onLaunch, function () {
                ctx = this;
            });
            if (option.onAwake) {
                message.on('app:sleep', (t) => {
                    option.onAwake.call(ctx, t);
                });
            }
            /**
             * Use app config
             */
            App(option);
        }

        function appLaunchHandler() {
            isAppLaunched = [].slice.call(arguments);
            message.emit('app:launch', isAppLaunched);
        }

        function appShowHandler() {
            try {
                if (!isAppShowed) {
                    // call onAppShow only once
                    isAppShowed = [].slice.call(arguments);
                    message.emit('app:show', isAppShowed);
                }
            } finally {
                if (!hideTime) return;
                const t = hideTime;
                hideTime = 0;
                message.emit('app:sleep', new Date() - t);
            }
        }

        function appHideHandler() {
            hideTime = new Date();
        }

        Page.P = WXPage;
        Page.C = Component.C = WXPage.C = WXPage.Comp = WXPage.Component = C;
        Page.A = App.A = WXPage.A = WXPage.App = WXPage.Application = Application;
        WXPage.redirector = redirector;
        WXPage.message = message;
        WXPage.cache = cache;
        WXPage.fns = fns;
        WXPage.getPageName = bridge.getPageName;

        /**
         * Config handler
         */

        WXPage.config = function (key, value) {
            if (fns.type(key) == 'object') {
                fns.objEach(key, (k, v) => {
                    _conf.set(k, v);
                });
            } else {
                _conf.set(key, value);
            }
            return this;
        };
        message.assign(WXPage);
        message.assign(C);
        message.assign(Application);
        module.exports = WXPage;


        /** */
    }),
    /** *** */
]));
