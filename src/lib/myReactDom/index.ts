import myReact from "../myReact/index.js";

function mapAttributeNameToEventName(attributeName: string) {
    switch (attributeName) {
        case "onclick":
            return "click";
        case "onchange":
            return "change";
        default:
            return "";
    }
}

const app: {
    reactElement: any | null;
    containerElement: HTMLElement | null;
} = {
    reactElement: null,
    containerElement: null,
};

export function render(element: any, container: HTMLElement) {
    // Store the root dom element so that we can rerender it later
    if (!app.reactElement) {
        app.reactElement = element;
        app.containerElement = container;
    }

    // Create dom element
    const domElement: HTMLElement = document.createElement(element.tag);

    // If the element is a primitive type, add it as text
    if (["string", "number"].includes(typeof element)) {
        return container.appendChild(document.createTextNode(element));
    }

    const { children, ...restProps } = element.props;

    // Pass all props to dom element
    Object.keys(restProps).forEach((prop) => {
        if (typeof restProps[prop] === "function") {
            domElement.addEventListener(
                mapAttributeNameToEventName(prop),
                restProps[prop]
            );
        }
        domElement.setAttribute(prop, restProps[prop]);
    });

    // Recursively render children
    children.forEach((child: any) => render(child, domElement));

    container.appendChild(domElement);
}

// TODO: this is causing a circular dependency at the moment
export function reRender() {
    const initialRender = myReact.getInitialRender();
    if (!initialRender || !app.containerElement) return;

    app.containerElement.innerHTML = "";

    render(
        myReact.createElement(
            initialRender.tag,
            initialRender.props,
            ...initialRender.children
        ),
        app.containerElement
    );
}
