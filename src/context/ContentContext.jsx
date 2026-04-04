import { createContext, useContext, useState, useCallback } from 'react';
import { DEFAULT_CONTENT } from '../data/defaultContent';

const STORAGE_KEY = 'sn_content';
const THEME_KEY = 'sn_theme';

function loadContent() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // fall through
  }
  return JSON.parse(JSON.stringify(DEFAULT_CONTENT));
}

function loadTheme() {
  return localStorage.getItem(THEME_KEY) || 'dark';
}

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(loadContent);
  const [theme, setTheme] = useState(loadTheme);

  const saveContent = useCallback((updated) => {
    setContent(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const resetContent = useCallback(() => {
    const defaults = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
    setContent(defaults);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  }, []);

  return (
    <ContentContext.Provider value={{ content, saveContent, resetContent, theme, toggleTheme }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
