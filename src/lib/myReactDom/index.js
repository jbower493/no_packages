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
import myReact from "../myReact/index.js";
function mapAttributeNameToEventName(attributeName) {
    switch (attributeName) {
        case "onclick":
            return "click";
        case "onchange":
            return "change";
        default:
            return "";
    }
}
const app = {
    reactElement: null,
    containerElement: null,
};
export function render(element, container) {
    // Store the root dom element so that we can rerender it later
    if (!app.reactElement) {
        app.reactElement = element;
        app.containerElement = container;
    }
    // Create dom element
    const domElement = document.createElement(element.tag);
    // If the element is a primitive type, add it as text
    if (["string", "number"].includes(typeof element)) {
        return container.appendChild(document.createTextNode(element));
    }
    if (element.props) {
        const _a = element.props, { children } = _a, restProps = __rest(_a, ["children"]);
        // Pass all props to dom element
        Object.keys(restProps).forEach((prop) => {
            if (typeof restProps[prop] === "function") {
                domElement.addEventListener(mapAttributeNameToEventName(prop), restProps[prop]);
            }
            domElement.setAttribute(prop, restProps[prop]);
        });
        // Recursively render children
        children.forEach((child) => render(child, domElement));
    }
    container.appendChild(domElement);
}
// TODO: this is causing a circular dependency at the moment
export function reRender() {
    const initialRender = myReact.getInitialRender();
    if (!initialRender || !app.containerElement)
        return;
    app.containerElement.innerHTML = "";
    render(myReact.createElement(initialRender.tag, initialRender.props, ...initialRender.children), app.containerElement);
}
