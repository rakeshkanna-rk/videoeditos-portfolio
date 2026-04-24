import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
import { User } from '@supabase/supabase-js';

interface AdminAuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
    user: null,
    isAuthenticated: false,
    loading: true,
    login: async () => ({ success: false }),
    logout: async () => { },
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check current session
        const initAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };

        initAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                return { success: true };
            }
            return { success: false, error: 'Login failed' };
        } catch (err: any) {
            return { success: false, error: err.message || 'An error occurred' };
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
        window.location.hash = '#/admin/login';
    };

    return (
        <AdminAuthContext.Provider value={{ 
            user, 
            isAuthenticated: !!user, 
            loading,
            login, 
            logout 
        }}>
            {children}
        </AdminAuthContext.Provider>
    );
};
