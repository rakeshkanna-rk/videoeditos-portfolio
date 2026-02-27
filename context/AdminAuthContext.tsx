import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';

interface AdminAuthContextType {
    token: string | null;
    email: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
    token: null,
    email: null,
    isAuthenticated: false,
    login: async () => ({ success: false }),
    logout: () => { },
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('admin_token'));
    const [email, setEmail] = useState<string | null>(() => localStorage.getItem('admin_email'));

    const login = async (emailInput: string, password: string) => {
        try {
            const { data, error } = await supabase.rpc('admin_login', {
                p_email: emailInput,
                p_password: password,
            });

            if (error) throw error;

            if (data?.success) {
                setToken(data.token);
                setEmail(data.email);
                localStorage.setItem('admin_token', data.token);
                localStorage.setItem('admin_email', data.email);
                return { success: true };
            } else {
                return { success: false, error: data?.error || 'Login failed' };
            }
        } catch (err: any) {
            return { success: false, error: err.message || 'An error occurred' };
        }
    };

    const logout = () => {
        setToken(null);
        setEmail(null);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_email');
        window.location.hash = '#/admin/login';
    };

    return (
        <AdminAuthContext.Provider value={{ token, email, isAuthenticated: !!token, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};
