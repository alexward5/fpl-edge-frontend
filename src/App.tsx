import "./App.css";
import Body from "./components/Body/Body.tsx";
import Header from "./components/Header/Header.tsx";

function App() {
    return (
        <>
            <div className="app-contianer">
                <Header />
                <Body />
            </div>
        </>
    );
}

export default App;
