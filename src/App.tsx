import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import KeyboardCustomize from './pages/keyboard-customize';
import KeyboardDesign from './pages/keyboard-design';
import Test from './pages/test';
import DefaultLayout from './layouts/default';
import { KeyboardProvider } from './contexts/KeyboardContext';

function App() {
  return (
    <Router>
      <KeyboardProvider>
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/keyboard-customize" element={<KeyboardCustomize />} />
            <Route path="/keyboard-design" element={<KeyboardDesign />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </DefaultLayout>
      </KeyboardProvider>
    </Router>
  );
}

export default App;