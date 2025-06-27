import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { AppState, User, TestConfig, TestResult } from '../types';

interface AppContextType {
  state: AppState;
  setUser: (user: User) => void;
  startTest: (config: TestConfig) => void;
  answerQuestion: (answerIndex: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  finishTest: (result: TestResult) => void;
  resetTest: () => void;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type Action =
  | { type: 'SET_USER'; payload: User }
  | { type: 'START_TEST'; payload: TestConfig }
  | { type: 'ANSWER_QUESTION'; payload: { index: number; answer: number } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'FINISH_TEST'; payload: TestResult }
  | { type: 'RESET_TEST' }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> };

const initialState: AppState = {
  user: null,
  currentTest: null,
  testInProgress: false,
  currentQuestionIndex: 0,
  answers: [],
  testResult: null,
  darkMode: true, // Default to dark mode
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'START_TEST':
      return {
        ...state,
        currentTest: action.payload,
        testInProgress: true,
        currentQuestionIndex: 0,
        answers: new Array(action.payload.questionCount).fill(-1),
        testResult: null,
      };
    case 'ANSWER_QUESTION':
      const newAnswers = [...state.answers];
      newAnswers[action.payload.index] = action.payload.answer;
      return { ...state, answers: newAnswers };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          (state.currentTest?.questionCount ?? 1) - 1
        ),
      };
    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      };
    case 'FINISH_TEST':
      return {
        ...state,
        testInProgress: false,
        testResult: action.payload,
      };
    case 'RESET_TEST':
      return {
        ...state,
        currentTest: null,
        testInProgress: false,
        currentQuestionIndex: 0,
        answers: [],
        testResult: null,
      };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('skillscan-ai-state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Failed to load saved state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('skillscan-ai-state', JSON.stringify(state));
  }, [state]);

  const setUser = (user: User) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const startTest = (config: TestConfig) => {
    dispatch({ type: 'START_TEST', payload: config });
  };

  const answerQuestion = (answerIndex: number) => {
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: { index: state.currentQuestionIndex, answer: answerIndex },
    });
  };

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const previousQuestion = () => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  };

  const finishTest = (result: TestResult) => {
    dispatch({ type: 'FINISH_TEST', payload: result });
  };

  const resetTest = () => {
    dispatch({ type: 'RESET_TEST' });
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setUser,
        startTest,
        answerQuestion,
        nextQuestion,
        previousQuestion,
        finishTest,
        resetTest,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}