
import React from 'react';
import { DashboardIcon, AgentIcon, ServerIcon } from './icons/NavIcons';

type View = 'Dashboard' | 'Agents' | 'Server';

interface NavigationSidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: View;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex flex-col items-center justify-center p-3 text-xs font-medium rounded-lg transition-colors ${
            isActive ? 'bg-cyan-600/50 text-cyan-300' : 'text-gray-400 hover:bg-slate-700/50'
        }`}
    >
        {icon}
        <span className="mt-1">{label}</span>
    </button>
);

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <nav className="w-24 bg-slate-900/75 p-3 space-y-3 border-r border-slate-700/50">
        <NavItem 
            icon={<DashboardIcon />}
            label="Dashboard"
            isActive={activeView === 'Dashboard'}
            onClick={() => onViewChange('Dashboard')}
        />
        <NavItem 
            icon={<AgentIcon />}
            label="Agents"
            isActive={activeView === 'Agents'}
            onClick={() => onViewChange('Agents')}
        />
        <NavItem 
            icon={<ServerIcon />}
            label="Server"
            isActive={activeView === 'Server'}
            onClick={() => onViewChange('Server')}
        />
    </nav>
  );
};

export default NavigationSidebar;
