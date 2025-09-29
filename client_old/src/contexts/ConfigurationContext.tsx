import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteConfiguration } from '@shared/schema';

interface ConfigurationContextType {
  config: SiteConfiguration | null;
  setConfig: (config: SiteConfiguration) => void;
  isBuilderMode: boolean;
  setIsBuilderMode: (mode: boolean) => void;
}

const ConfigurationContext = createContext<ConfigurationContextType | undefined>(undefined);

export function useConfiguration() {
  const context = useContext(ConfigurationContext);
  if (context === undefined) {
    throw new Error('useConfiguration must be used within a ConfigurationProvider');
  }
  return context;
}

interface ConfigurationProviderProps {
  children: ReactNode;
  defaultConfig?: SiteConfiguration;
}

export function ConfigurationProvider({ children, defaultConfig }: ConfigurationProviderProps) {
  const [config, setConfig] = useState<SiteConfiguration | null>(defaultConfig || null);
  const [isBuilderMode, setIsBuilderMode] = useState(true);

  // Load config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('site-configuration');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.error('Failed to parse saved configuration:', error);
      }
    }
  }, []);

  // Save config to localStorage when it changes
  useEffect(() => {
    if (config) {
      localStorage.setItem('site-configuration', JSON.stringify(config));
    }
  }, [config]);

  return (
    <ConfigurationContext.Provider value={{ config, setConfig, isBuilderMode, setIsBuilderMode }}>
      {children}
    </ConfigurationContext.Provider>
  );
}