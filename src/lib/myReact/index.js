var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { reRender } from "../myReactDom/index.js";
const myReact = (function () {
    let initialRender = null;
    function getInitialRender() {
        return initialRender;
    }
    function createElement(tag, props, 
    // TODO: type this
    ...children) {
        // If its the root render, capture the args for use in ReactDOM.reRender
        if (!initialRender) {
            initialRender = { tag, props, children };
        }
        if (typeof tag === "function") {
            return tag(props);
        }
        // Filter out source and self from props
        const _a = props || {}, { __source, __self } = _a, restProps = __rest(_a, ["__source", "__self"]);
        const element = {
            tag,
            props: Object.assign(Object.assign({}, restProps), { children }),
        };
        return element;
    }
    const hooks = {
        counter: 0,
        value: [],
    };
    function useState(initialState) {
        // Take a snapshot of the current counter so that we can increment the counter before we read the current value
        const frozenCursor = hooks.counter;
        // Increment the counter to be used by the next hook
        hooks.counter++;
        // If the state doesn't exist yet, initialize it
        if (hooks.value[frozenCursor] === undefined) {
            hooks.value[frozenCursor] = initialState;
        }
        function setState(newState) {
            // Update the state
            hooks.value[frozenCursor] = newState;
            // Reset the counter then rerender everything
            hooks.counter = 0;
            reRender();
        }
        return [hooks.value[frozenCursor], setState];
    }
    function useEffect(callback, dependencies) {
        // Take a snapshot of the current counter so that we can increment the counter before we read the current value
        const frozenCursor = hooks.counter;
        const frozenDeps = hooks.value[frozenCursor];
        hooks.value[frozenCursor] = dependencies;
        // Increment the counter to be used by the next hook
        hooks.counter++;
        let cleanupFunc = undefined;
        // If its not the first time and the dependencies havent changed, do nothing
        if (frozenDeps &&
            frozenDeps.every((frozenDep, index) => frozenDep === dependencies[index])) {
            return;
        }
        // TODO: find a way to run this on unmount of the component that runs the effect
        cleanupFunc = callback();
    }
    // TODO: implement a reconciler so that components only rerender when they need to
    function reconcile() { }
    return {
        createElement,
        useState,
        useEffect,
        getInitialRender,
    };
})();
export default myReact;
