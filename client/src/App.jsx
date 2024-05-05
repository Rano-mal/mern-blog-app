import Home from './pages/Home';
import About from './pages/About';
import Article from './pages/Article';
import ArticlesList from './pages/ArticleList';
import { Routes, Route } from 'react-router-dom';
// Components
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <>
      <Navbar />
      <h1 className='max-w-screen-md mx-auto pt-20'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/article/:name' element={<Article />} />
          <Route path='/articles-list' element={<ArticlesList />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </h1>
    </>
  );
};

export default App;
