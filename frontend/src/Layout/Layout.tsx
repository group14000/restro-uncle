import React, { ReactNode } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 bg-gray-100 p-5">
                {children}
            </main>
        </div>
    );
};

export default Layout;
