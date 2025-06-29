import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { BoltCircle } from './components/BoltCircle';
import { ProfileButton } from './components/ProfileButton';
import { LoginPage } from './pages/LoginPage';
import { TestSelectionPage } from './pages/TestSelectionPage';
import { TestPage } from './pages/TestPage';
import { ResultsPage } from './pages/ResultsPage';
import { LearningPage } from './pages/LearningPage';
import { LearningTopicPage } from './pages/LearningTopicPage';

function AppContent() {
  const { state, startTest } = useApp();

  // Always use dark mode
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }

  const handleLogin = () => {
    window.history.pushState(null, '', '/test-selection');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleTestSelect = (testType: 'quick' | 'full') => {
    const config = {
      type: testType,
      questionCount: testType === 'quick' ? 10 : 25,
      timeLimit: testType === 'quick' ? 5 : 22
    };
    startTest(config);
    window.history.pushState(null, '', '/test');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleTestComplete = () => {
    window.history.pushState(null, '', '/results');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleRestart = () => {
    window.history.pushState(null, '', '/test-selection');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen">
      <BoltCircle />
      {state.user && <ProfileButton />}
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              state.user ? (
                <Navigate to="/test-selection" replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/test-selection" 
            element={
              state.user ? (
                <TestSelectionPage onTestSelect={handleTestSelect} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/test" 
            element={
              state.testInProgress ? (
                <TestPage onTestComplete={handleTestComplete} />
              ) : (
                <Navigate to="/test-selection" replace />
              )
            } 
          />
          <Route 
            path="/results" 
            element={
              state.testResult ? (
                <ResultsPage onRestart={handleRestart} />
              ) : (
                <Navigate to="/test-selection" replace />
              )
            } 
          />
          <Route 
            path="/learning" 
            element={<LearningPage />} 
          />
          <Route 
            path="/learning/:topicId" 
            element={<LearningTopicPage />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;