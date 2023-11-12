import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProductForm from './app/editProduct/ProductForm';
import ProductDetail from './app/productDetail/ProductDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/productDetail" element={<ProductDetail />} />
        <Route path="/editProduct" element={<ProductForm />} />
        {/* Route อื่นๆ เพิ่มเติม */}
      </Routes>
    </Router>
  );
}

export default App;
