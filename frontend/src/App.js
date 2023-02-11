import './App.css';
import {Top, Main, Footer} from "./components/Layout"
import FirebaseApp from 'fbase';

function App() {

    return (
        <div className="App">
            {/* Layout */}
            <Top></Top>
            <Main></Main>
            <Footer></Footer>
        </div>
    );
}

export default App;
