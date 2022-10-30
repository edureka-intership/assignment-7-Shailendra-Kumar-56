import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Filter from './Filter';
import Carousel from './Carousel';
import Details from './Details';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/filter" element={<Filter />} />
                <Route path="/carousel" element={<Carousel />} />
                <Route path="/details" element={<Details />} /> 
              
            </Routes>
        </BrowserRouter>
    )
}
export default Router;