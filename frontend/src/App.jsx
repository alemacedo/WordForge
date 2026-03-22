import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import DashboardLayout from './components/DashboardLayout';
import WordList from './pages/WordList';
import WordForm from './pages/WordForm';
import WordDetail from './pages/WordDetail';
import WebVitals from './pages/WebVitals';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<WordList />} />
          <Route path="/words/new" element={<WordForm />} />
          <Route path="/words/:id" element={<WordDetail />} />
          <Route path="/words/:id/edit" element={<WordForm />} />
          <Route path="/web-vitals" element={<WebVitals />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
