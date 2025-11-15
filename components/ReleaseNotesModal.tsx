
import React from 'react';

interface ReleaseNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Feature: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h4 className="font-semibold text-cyan-400">{title}</h4>
        <p className="text-gray-400 text-sm mt-1">{children}</p>
    </div>
);

const ReleaseNotesModal: React.FC<ReleaseNotesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  
  return (
    <div 
        className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl w-full max-w-2xl text-gray-200 flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-gray-700 flex justify-between items-center shrink-0">
          <h2 className="text-xl font-bold">What's New in v1.3.0</h2>
          <button onClick={onClose} className="text-2xl font-light p-1 rounded-full leading-none hover:bg-gray-700">&times;</button>
        </header>

        <main className="p-6 flex-1 overflow-y-auto space-y-4">
            <h3 className="text-lg font-bold text-gray-100">Agent Action &amp; Remediation Visibility</h3>
            
            <Feature title="New: Agent Remediation History">
                The Agent Fleet detail view now includes a 'Remediation History' section, showing all automated remediation actions (e.g., host isolation, process termination) taken on the selected agent for a complete audit trail.
            </Feature>
            
            <div className="border-t border-slate-700 my-6"></div>

            <h3 className="text-lg font-bold text-gray-100">Previous Versions</h3>
            <h4 className="text-md font-semibold text-gray-300 mt-2">v1.2.0 - Enterprise Readiness Overhaul</h4>
            <div className="space-y-4 mt-2 pl-2 border-l-2 border-slate-700">
                <Feature title="Enterprise Agent Fleet Management">
                    A new dedicated 'Agent Fleet' view provides an enterprise-grade asset management interface. Features a powerful table with sortable columns for Status, Hostname, OS, IP Address, and more. Includes filtering and search capabilities.
                </Feature>
                <Feature title="Interactive Master-Detail UI">
                    The console now features a robust master-detail view. Clicking on server intelligence events opens a full-screen detail panel for deep analysis, and the agent fleet view allows for drilling down into a specific agent's posture and alerts.
                </Feature>
                <Feature title="Professional UI & Layout">
                    The entire application was redesigned with a more professional, panel-based layout driven by a new navigation sidebar. This improves clarity, user experience, and resolves all previous scrolling issues.
                </Feature>
            </div>
        </main>
         <footer className="p-4 bg-gray-900/50 border-t border-gray-700 flex justify-end items-center gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-md">
                Close
            </button>
        </footer>
      </div>
    </div>
  );
};

export default ReleaseNotesModal;
