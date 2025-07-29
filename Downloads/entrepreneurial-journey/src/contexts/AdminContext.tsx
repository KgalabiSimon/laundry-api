'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Venture, ReactionType } from '@/types/venture';

interface AdminContextType {
  isAuthenticated: boolean;
  ventures: Venture[];
  login: (password: string) => boolean;
  logout: () => void;
  updateVenture: (venture: Venture) => void;
  deleteVenture: (id: string) => void;
  addVenture: (venture: Omit<Venture, 'id' | 'views' | 'reactions'>) => void;
  updateVentureReaction: (ventureId: string, reactionType: ReactionType) => void;
  incrementViews: (ventureId: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Simple demo password - in production, use proper authentication
const ADMIN_PASSWORD = 'admin123';

export function AdminProvider({ children, initialVentures }: {
  children: React.ReactNode;
  initialVentures: Venture[];
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ventures, setVentures] = useState<Venture[]>(initialVentures);

  // Check for existing auth on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    // Load ventures from localStorage if available
    const savedVentures = localStorage.getItem('admin_ventures');
    if (savedVentures) {
      try {
        setVentures(JSON.parse(savedVentures));
      } catch (error) {
        console.error('Error loading saved ventures:', error);
      }
    }
  }, []);

  // Save ventures to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('admin_ventures', JSON.stringify(ventures));
  }, [ventures]);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
  };

  const updateVenture = (updatedVenture: Venture) => {
    setVentures(prev =>
      prev.map(venture =>
        venture.id === updatedVenture.id ? updatedVenture : venture
      )
    );
  };

  const deleteVenture = (id: string) => {
    setVentures(prev => prev.filter(venture => venture.id !== id));
  };

  const addVenture = (newVentureData: Omit<Venture, 'id' | 'views' | 'reactions'>) => {
    const newVenture: Venture = {
      ...newVentureData,
      id: Date.now().toString(),
      views: 0,
      reactions: {
        heart: 0,
        sad: 0,
        laugh: 0,
        surprise: 0,
        angry: 0,
        thinking: 0
      }
    };
    setVentures(prev => [...prev, newVenture]);
  };

  const updateVentureReaction = (ventureId: string, reactionType: ReactionType) => {
    setVentures(prev =>
      prev.map(venture =>
        venture.id === ventureId
          ? {
              ...venture,
              reactions: {
                ...venture.reactions,
                [reactionType]: venture.reactions[reactionType] + 1
              }
            }
          : venture
      )
    );
  };

  const incrementViews = (ventureId: string) => {
    setVentures(prev =>
      prev.map(venture =>
        venture.id === ventureId
          ? { ...venture, views: venture.views + 1 }
          : venture
      )
    );
  };

  const value = {
    isAuthenticated,
    ventures,
    login,
    logout,
    updateVenture,
    deleteVenture,
    addVenture,
    updateVentureReaction,
    incrementViews
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
