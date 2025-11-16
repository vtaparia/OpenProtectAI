



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
          <h2 className="text-xl font-bold">What's New in v2.0.0</h2>
          <button onClick={onClose} className="text-2xl font-light p-1 rounded-full leading-none hover:bg-gray-700">&times;</button>
        </header>

        <main className="p-6 flex-1 overflow-y-auto space-y-4">
            <h3 className="text-lg font-bold text-gray-100">Architecture Upgrade: Zero Trust Communication Fabric</h3>
            
            <Feature title="End-to-End Encryption (mTLS)">
                All communication between agents, LWServers, and the central cloud platform is now secured using a Zero Trust model. Every service-to-service connection is authenticated and encrypted using mutual TLS (mTLS), preventing unauthorized access and man-in-the-middle attacks.
            </Feature>
            <Feature title="Hardened Security Posture">
                This architectural enhancement ensures that every component must present a valid, signed client certificate to establish a connection. This provides a robust and resilient security posture for the entire platform, protecting data at every point in its journey.
            </Feature>
            
            <div className="border-t border-slate-700 my-6"></div>

            <h3 className="text-lg font-bold text-gray-100">Previous Versions</h3>

            <h4 className="text-md font-semibold text-gray-300 mt-2">v1.9.9 - AI-Powered Central Brain</h4>
            <div className="space-y-2 mt-2 pl-2 border-l-2 border-slate-700">
                 <Feature title="Global Intelligence Fusion">
                    The server's learning engine is now designed to integrate with a wider security ecosystem. It can ingest and correlate signals from tools like CrowdStrike Falcon, SentinelOne, Zeek, and OSQuery, creating a more powerful, unified view of your environment.
                </Feature>
                <Feature title="AI-Driven Analysis & Knowledge Graph">
                    The core of the server is now an AI-powered "brain" that uses models like Gemini and Grok to analyze patterns and learn from telemetry. A new "Global Knowledge Graph" on the dashboard visualizes how the server links disparate entities—like CVEs, processes, and IPs—into a coherent threat picture.
                </Feature>
                 <Feature title="Continuous Learning Loop">
                    The platform's architecture is formalized around a continuous feedback loop: agents provide data, the server's AI brain learns and trains on it, and then pushes improved intelligence and detection models back to the entire fleet, making the system smarter over time.
                </Feature>
            </div>
            
            <h4 className="text-md font-semibold text-gray-300 mt-2">v1.9.8 - Advanced Agent Baselining & Heuristics</h4>
            <div className="space-y-2 mt-2 pl-2 border-l-2 border-slate-700">
                <Feature title="Dynamic Process Monitoring">
                    Agents now track process start times and parent-child relationships, enhancing the contextual data available for resource consumption anomalies and improving investigation accuracy.
                </Feature>
                <Feature title="Contextual Anomaly Detection">
                    The agent's intelligence is improved. Anomaly detection for CPU, memory, and network usage now more heavily weighs a process's historical behavior and fleet-wide intelligence from the server to reduce false positives.
                </Feature>
                 <Feature title="Enhanced Ransomware Heuristics">
                    The file-write monitoring logic has been refined to better distinguish between legitimate high-volume I/O (like backups) and malicious encryption patterns, improving the fidelity of ransomware alerts.
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
