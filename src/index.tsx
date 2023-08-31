import myReact from "./lib/myReact/index.js";
import { render } from "./lib/myReactDom/index.js";

const Counter = () => {
    const [count, setCount] = myReact.useState(0);
    console.log("counter rendered");
    return (
        <div>
            <button onclick={() => setCount(count + 1)}>Increment Count</button>
            <h3>Count: {count}</h3>
        </div>
    );
};

const Namer = () => {
    const [name, setName] = myReact.useState("Kenny");
    console.log("namer rendered");
    return (
        <div>
            <input
                placeholder="name"
                type="text"
                value={name}
                onchange={(e: any) => setName(e.target.value)}
            />
            <h3>Name: {name}</h3>
        </div>
    );
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
    return (
        <div>
            <button onclick={() => setEffectiveness(effectiveness + 1)}>
                Become More Effective
            </button>
            <span>Effectiveness: {effectiveness}</span>
            <button onclick={() => setIrrelevance(irrelevance + 1)}>
                Become More Irrelevant
            </button>
            <span>Irrelevance: {irrelevance}</span>
        </div>
    );
};

const App = () => {
    const [isCounterShowing, setIsCounterShowing] = myReact.useState(false);

    return (
        <section>
            <h1>Hello</h1>
            <Namer />
            <button onclick={() => setIsCounterShowing(!isCounterShowing)}>
                Toggle counter
            </button>
            {/* TODO: currently this breaks the hooks mechanism, because a different amount of hooks are being rendered. I still don't quite understand how this works */}
            {isCounterShowing && <Counter />}
            <Effectiveness />
        </section>
    );
};

render(<App />, document.getElementById("app")!);
