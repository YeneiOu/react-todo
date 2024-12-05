import "./App.css";
import {Toaster} from "@/components/ui/toaster"


// components
import TodoPage from "@/page/TodoPage.tsx";

function App() {


    console.log("todo-version: 1")
    return (
        <>
            <TodoPage/>
            <Toaster/>
        </>
    );
}

export default App;