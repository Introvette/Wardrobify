import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import ShoeForm from './ShoeForm';
import HatList from './HatList';
import HatsForm from './HatsForm';



function App() {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/shoes" element={<ShoesList />} />
          <Route path="/shoes/new" element={<ShoeForm />} />
          <Route path="/hats" element={<HatList />} />
          <Route path="/hats/new" element={<HatsForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
