import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import store from "./utils/store";
import { Provider } from "react-redux"
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";

const App = () => {
  return(
	<Provider store={store}>
    <BrowserRouter>
    	<Routes>
        	<Route path="/" element={<Body/>}>
				<Route path="/Login" element={<Login/>}/>
				<Route path="/Profile" element={<Profile/>}/>
				<Route path ="/Feed" element={<Feed/>}/>
				<Route path ="/Connections" element={<Connections/>}/>
        	</Route>
      	</Routes>
    </BrowserRouter>
	</Provider>
  );
};

export default App;
