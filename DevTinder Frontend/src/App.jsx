import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";

const App = () => {
  return(
    <BrowserRouter>
    	<Routes>
        	<Route path="/" element={<Body/>}>
				<Route path="/Login" element={<Login/>}/>
        	</Route>
      	</Routes>
    </BrowserRouter>
  );
};

export default App;
