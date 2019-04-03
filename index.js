;(function(undefined) {
    "use strict"
    var _global;
    function Events() {
        // this.defalutNameSpace = 'defalut';
        this.eventList = {};
        this._shift = Array.prototype.shift;
        this._slice = Array.prototype.slice;
        this._splice = Array.prototype.splice;
    }
    // 事件监听
    Events.prototype.listen = function(eventName, fn) {
        if (!isFunction(fn)) {
            throw new Error('Events.prototype.listen || [eventName, fn] -> Error: "fn" must be a function');
        };
        if (! this.eventList[eventName]) {
            this.eventList[eventName] = [];
        }
        this.eventList[eventName].push(fn);
    }
    
    Events.prototype.emit = function() {
        var eventName = this._shift.call(arguments);
        if (!eventName) {
            console.warn('Events.prototype.emit || [eventName] -> Error: "can not find eventName"');
        }
        var currentEventList = this.eventList[eventName];
        for(var i = 0, fn; fn = currentEventList[i++];) {
            fn.apply(this, arguments);
        } 
    }
    // 移除事件
    Events.prototype.remove = function(eventName, fn) {
        var currentEventList = this.eventList[eventName];
        if (!currentEventList) {
            return false;
        }
        if (!fn) {
            currentEventList && (currentEventList.length = 0);
        } else {
            var len = currentEventList.length;
            for(var i = len - 1; i >= 0; i--) {
                if (fn === currentEventList[i]) {
                    this._splice.call(currentEventList, i, 1);
                }
            }
        }
    }


    _global = (function(){ return this || (0, eval)('this'); }());
    // 适配三端
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = new Events();
    } else if (typeof define === 'function' && (define.cmd || define.amd)) {
        define(function(){
            return Events;
        });
    } else {
        !('Events' in _global) && (_global.Events = Events);    
    }

    /**
     * 检测是否为函数
     * @param {*} fn 需要检测的函数
     */
    function isFunction(fn) {
        return fn instanceof Function;
    }

}())