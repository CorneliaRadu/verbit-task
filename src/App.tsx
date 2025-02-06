import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { View, Flex } from '@aws-amplify/ui-react';
import { store } from './store/store';
import { Navbar } from './components/Navbar';
import { Cart } from './components/Cart';
import { BooksPage } from './pages/BooksPage';
import { ProfilePage } from './pages/ProfilePage';
import '@aws-amplify/ui-react/styles.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Flex minHeight="100vh" backgroundColor="neutral.10">
          <Flex flex="1" direction="column">
            <Navbar />
            <View flex="1">
              <Routes>
                <Route path="/" element={<BooksPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </View>
          </Flex>
          <Cart />
        </Flex>
        <Toaster position="top-right" />
      </Router>
    </Provider>
  );
}

export default App;