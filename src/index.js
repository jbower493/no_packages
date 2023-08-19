import myReact from "./lib/myReact/index.js";
import { render } from "./lib/myReactDom/index.js";
const Counter = () => {
    const [count, setCount] = myReact.useState(0);
    console.log("counter rendered");
    return (myReact.createElement("div", null,
        myReact.createElement("button", { onclick: () => setCount(count + 1) }, "Increment Count"),
        myReact.createElement("h3", null,
            "Count: ",
            count)));
};
const Namer = () => {
    const [name, setName] = myReact.useState("Kenny");
    console.log("namer rendered");
    return (myReact.createElement("div", null,
        myReact.createElement("input", { placeholder: "name", type: "text", value: name, onchange: (e) => setName(e.target.value) }),
        myReact.createElement("h3", null,
            "Name: ",
            name)));
};
const Effectiveness = () => {
    const [effectiveness, setEffectiveness] = myReact.useState(0);
    const [irrelevance, setIrrelevance] = myReact.useState(0);
    myReact.useEffect(() => {
        console.log("use effect ran");
        return () => {
            console.log("cleaned up");
        };
    }, [effectiveness]);
    console.log("effectiveness rendered");
    return (myReact.createElement("div", null,
        myReact.createElement("button", { onclick: () => setEffectiveness(effectiveness + 1) }, "Become More Effective"),
        myReact.createElement("span", null,
            "Effectiveness: ",
            effectiveness),
        myReact.createElement("button", { onclick: () => setIrrelevance(irrelevance + 1) }, "Become More Irrelevant"),
        myReact.createElement("span", null,
            "Irrelevance: ",
            irrelevance)));
};
const App = () => (myReact.createElement("section", null,
    myReact.createElement("h1", null, "Hello"),
    myReact.createElement(Namer, null),
    myReact.createElement(Counter, null),
    myReact.createElement(Effectiveness, null)));
render(myReact.createElement(App, null), document.getElementById("app"));
