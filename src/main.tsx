import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { EditProvider } from './contexts/EditContext'

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <EditProvider>
      <App />
    </EditProvider>
  </AuthProvider>
);
