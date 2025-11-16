



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
          <h2 className="text-xl font-bold">What's New in v2.0.2</h2>
          <button onClick={onClose} className="text-2xl font-light p-1 rounded-full leading-none hover:bg-gray-700">&times;</button>
        </header>

        <main className="p-6 flex-1 overflow-y-auto space-y-4">
            <h3 className="text-lg font-bold text-gray-100">Architectural Visibility & SOAR Enhancements</h3>
            
            <Feature title="New! LWServer Knowledge Meter">
                The main dashboard now includes a "LWServer Knowledge Tier" meter. This provides critical visibility into the intelligence level of your data aggregation points, showing how effectively they are processing and sanitizing data before it reaches the central server.
            </Feature>
            <Feature title="New SOAR Action: Outbound Notifications">
                The automation engine is now significantly more powerful. Playbooks can be configured to send real-time notifications to external systems, integrating the platform directly into your existing SOC and IT workflows.
            </Feature>
            <Feature title="Slack, MS Teams & Email Integration">
                The playbook editor now includes a dedicated section to add notification actions. You can configure playbooks to send alert summaries to a Slack channel, an MS Teams channel (via webhook), or to a specified email recipient, complete with a custom subject line.
            </Feature>
             <Feature title="Notification Auditing">
                When a playbook executes a notification action, a new "OUTBOUND_NOTIFICATION" event is logged in the Server Intelligence feed. This provides a complete and verifiable audit trail of all communications sent to external systems.
            </Feature>
            
            <div className="border-t border-slate-700 my-6"></div>

            <h3 className="text-lg font-bold text-gray-100">Previous Versions</h3>
            
            <h4 className="text-md font-semibold text-gray-300 mt-2">v2.0.1 - LWServer Fleet Management</h4>
            <div className="space-y-2 mt-2 pl-2 border-l-2 border-slate-700">
                <Feature title="Architectural Visibility">
                    A new "LWServer Fleet" view provides a real-time dashboard of all deployed LWServers, visualizing the critical middle tier of the platform's architecture that aggregates data from endpoint agents.
                </Feature>
                <Feature title="Dynamic Health & Performance Metrics">
                    Each LWServer in the fleet displays key health metrics, including the number of connected agents, live data ingestion/egress rates, and latency to the central server. These metrics are dynamically updated by the simulation based on agent activity.
                </Feature>
                <Feature title="Interactive Agent Drill-Down">
                    The view features a master-detail layout. Selecting an LWServer provides a detailed view of its configuration and a live list of all agents currently communicating through it, offering a clear operational picture of data flow.
                </Feature>
            </div>
            
            <h4 className="text-md font-semibold text-gray-300 mt-2">v2.0.0 - Zero Trust Communication Fabric</h4>
            <div className="space-y-2 mt-2 pl-2 border-l-2 border-slate-700">
                <Feature title="End-to-End Encryption (mTLS)">
                    All communication between agents, LWServers, and the central cloud platform is now secured using a Zero Trust model. Every service-to-service connection is authenticated and encrypted using mutual TLS (mTLS), preventing unauthorized access and man-in-the-middle attacks.
                </Feature>
                <Feature title="Hardened Security Posture">
                    This architectural enhancement ensures that every component must present a valid, signed client certificate to establish a connection. This provides a robust and resilient security posture for the entire platform, protecting data at every point in its journey.
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