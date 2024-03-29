import {Routes , Route} from 'react-router-dom';
import Home from "./pages/Home"; 
import Auth from "./pages/Auth";
import Setting from "./pages/Setting";
import Followers from "./pages/Followers";
import Followings from "./pages/Followings";
import "./App.css"; 
import Loader from './components/Loader';
function App() {
 // console.log(import.meta.env);
  return (
    <>
   
   <Routes>
        <Route path="/" element={<Auth />} />
        <Route path=":id" element={<Home />} />
        <Route path="/home">
          <Route index element={<Home />} />
          <Route path=":paramId" element={<Home />} />
          <Route path="followings" element={<Followings />} />
          <Route path="followers" element={<Followers />} />
        </Route>
        <Route path="/setting" element={<Setting />} />
  </Routes>
  
    </>
  
  );
}

export default App;
//Something in Curly BRackets {} Represents variable!