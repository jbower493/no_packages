interface HTMLAttributes {
    class?: "string";
}

export type CreateElementTag = keyof HTMLElementTagNameMap;

export interface CreateElementProps extends HTMLAttributes {
    __source: string;
    __self: string;
}

interface MyReactElementProps extends HTMLAttributes {}

export type MyReactElementComponent = (
    props: MyReactElementProps
) => MyReactElement;

export interface MyReactElement {
    tag: CreateElementTag;
    props: MyReactElementProps;
}
