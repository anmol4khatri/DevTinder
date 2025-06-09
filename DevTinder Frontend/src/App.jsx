import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import store from "./utils/store";
import { Provider } from "react-redux"

const App = () => {
  return(
	<Provider store={store}>
    <BrowserRouter>
    	<Routes>
        	<Route path="/" element={<Body/>}>
				<Route path="/Login" element={<Login/>}/>
        	</Route>
      	</Routes>
    </BrowserRouter>
	</Provider>
  );
};

export default App;
