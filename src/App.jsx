import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { EmployeeManagement } from './components/EmployeeManagement';

function App() {
  return (
    <Provider store={store}>
      <EmployeeManagement />
    </Provider>
  );
}

export default App;
