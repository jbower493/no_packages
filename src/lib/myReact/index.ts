import { reRender } from "../myReactDom/index.js";
import {
    MyReactElement,
    MyReactElementComponent,
    CreateElementTag,
    CreateElementProps,
} from "./types";

const myReact = (function () {
    let initialRender: {
        tag: CreateElementTag | MyReactElementComponent;
        props: CreateElementProps;
        children: any[];
    } | null = null;

    function getInitialRender() {
        return initialRender;
    }

    function createElement(
        tag: CreateElementTag | MyReactElementComponent,
        props: CreateElementProps,
        // TODO: type this
        ...children: any[]
    ): MyReactElement {
        // If its the root render, capture the args for use in ReactDOM.reRender
        if (!initialRender) {
            initialRender = { tag, props, children };
        }

        if (typeof tag === "function") {
            return tag(props);
        }

        // Filter out source and self from props
        const { __source, __self, ...restProps } = props || {};

        const element = {
            tag,
            props: {
                ...restProps,
                children,
            },
        };

        return element;
    }

    const hooks: {
        counter: number;
        value: any[];
    } = {
        counter: 0,
        value: [],
    };

    function useState<T>(initialState: T) {
        // Take a snapshot of the current counter so that we can increment the counter before we read the current value
        const frozenCursor = hooks.counter;

        // Increment the counter to be used by the next hook
        hooks.counter++;

        // If the state doesn't exist yet, initialize it
        if (hooks.value[frozenCursor] === undefined) {
            hooks.value[frozenCursor] = initialState;
        }

        function setState(newState: T) {
            // Update the state
            hooks.value[frozenCursor] = newState;

            // Reset the counter then rerender everything
            hooks.counter = 0;
            reRender();
        }

        return [hooks.value[frozenCursor], setState];
    }

    function useEffect(callback: () => void, dependencies: any[]) {
        // Take a snapshot of the current counter so that we can increment the counter before we read the current value
        const frozenCursor = hooks.counter;
        const frozenDeps = hooks.value[frozenCursor];

        hooks.value[frozenCursor] = dependencies;
        // Increment the counter to be used by the next hook
        hooks.counter++;

        let cleanupFunc = undefined;

        // If its not the first time and the dependencies havent changed, do nothing
        if (
            frozenDeps &&
            frozenDeps.every(
                (frozenDep: any, index: number) =>
                    frozenDep === dependencies[index]
            )
        ) {
            return;
        }

        // TODO: find a way to run this on unmount of the component that runs the effect
        cleanupFunc = callback();
    }

    // TODO: implement a reconciler so that components only rerender when they need to
    function reconcile() {}

    return {
        createElement,
        useState,
        useEffect,
        getInitialRender,
    };
})();

export default myReact;
