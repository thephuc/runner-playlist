import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, {persistor} from './store';
import Login from './components/Login';
import TempoForm from './components/TempoForm';
import SearchResults from './components/SearchResults';
import Callback from './components/Callback';

const App = () => {
  

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/tempo-form" element={<TempoForm  />} />
            <Route path="/search-result" element={<SearchResults  />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
            <Route
              path="*"
              element={<Navigate to="/tempo-form" replace={true} />}
            />
          </Routes>
        </Router>
      </PersistGate>
      
    </Provider>

  );
};

export default App;
