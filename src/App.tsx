import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import AuthInitializer from './components/AuthInitializer/AuthInitializer';

function App() {
  return (
    <BrowserRouter>
      <AuthInitializer>
        <AppRoutes />
      </AuthInitializer>
    </BrowserRouter>
  );
}

export default App;