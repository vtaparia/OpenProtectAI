
import React, { useState, useMemo } from 'react';
import { LWServer, Alert, Device } from '../types';
import { LWServerIcon } from './icons/NavIcons';
import { OnlineIcon, DegradedIcon, OfflineIcon } from './icons/StatusIcons';
import { WindowsIcon, LinuxIcon, AppleIcon, AndroidIcon } from './icons/OSIcons';

interface LWServerFleetViewProps {
    lwServers: LWServer[];
    alerts: Alert[];
    themeStyles: Record<string, string>;
}

const osIcons: Record<Device['os'], React.FC> = {
    Windows: WindowsIcon,
    Linux: LinuxIcon,
    macOS: AppleIcon,
    Android: AndroidIcon,
    Ubuntu: LinuxIcon,
    'Embedded Linux': LinuxIcon,
    'PAN-OS': LinuxIcon,
};

const Metric: React.FC<{ label: string; value: string | number; unit: string }> = ({ label, value, unit }) => (
    <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-lg font-bold text-gray-200">
            {value} <span className="text-xs font-normal text-gray-500">{unit}</span>
        </p>
    </div>
);

const getStatus = (status: LWServer['status']) => {
    switch(status) {
        case 'Online': return <div className="flex items-center gap-1.5"><OnlineIcon /> <span className="text-green-400">Online</span></div>;
        case 'Degraded': return <div className="flex items-center gap-1.5"><DegradedIcon /> <span className="text-yellow-400">Degraded</span></div>;
        case 'Offline': return <div className="flex items-center gap-1.5"><OfflineIcon /> <span className="text-red-400">Offline</span></div>;
    }
}

const LWServerFleetView: React.FC<LWServerFleetViewProps> = ({ lwServers, alerts, themeStyles }) => {
    const [selectedLws, setSelectedLws] = useState<LWServer | null>(lwServers[0] || null);

    const agentsByLwsId = useMemo(() => {
        if (!selectedLws) return [];
        const agentMap = new Map<string, Device>();
        alerts
            .filter(alert => alert.raw_data?.device.lwServerId === selectedLws.id)
            .forEach(alert => {
                if(alert.raw_data?.device) {
                    agentMap.set(alert.raw_data.device.hostname, alert.raw_data.device);
                }
            });
        return Array.from(agentMap.values());
    }, [selectedLws, alerts]);


    return (
        <div className="flex-1 flex gap-4 overflow-hidden">
            <div className="w-1/3 flex flex-col overflow-hidden bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg">
                <header className="p-4 border-b border-slate-700/50 shrink-0">
                    <h2 className="text-lg font-bold text-gray-100 flex items-center gap-2"><LWServerIcon /> LWServer Fleet Status</h2>
                    <p className="text-sm text-gray-400">Monitoring global data aggregation points.</p>
                </header>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {lwServers.map(lws => (
                        <div 
                            key={lws.id}
                            onClick={() => setSelectedLws(lws)}
                            className={`p-3 rounded-lg border-l-4 cursor-pointer transition-colors ${selectedLws?.id === lws.id ? 'bg-cyan-600/20 border-cyan-500' : 'bg-slate-900/50 border-slate-700 hover:bg-slate-800/80'}`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-gray-200">{lws.hostname}</p>
                                    <p className="text-xs text-gray-400">{lws.location}</p>
                                </div>
                                <div className="text-xs font-semibold">
                                    {getStatus(lws.status)}
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-slate-700/50 flex justify-between items-center text-center">
                                <Metric label="Agents" value={lws.connectedAgentCount} unit="online" />
                                <Metric label="Ingestion" value={lws.ingestionRate.toFixed(1)} unit="ev/s" />
                                <Metric label="Latency" value={lws.latencyMs.toFixed(0)} unit="ms" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
             <div className="w-2/3 flex flex-col overflow-hidden bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg">
                {selectedLws ? (
                     <>
                        <header className="p-4 border-b border-slate-700/50 shrink-0">
                            <h2 className="text-lg font-bold text-gray-100">{selectedLws.hostname}</h2>
                            <p className="text-sm text-gray-400">Connected Agent Details</p>
                        </header>
                        <div className="flex-1 overflow-y-auto">
                            <table className="w-full text-sm">
                                <thead className="sticky top-0 bg-slate-800/80 backdrop-blur-sm">
                                    <tr>
                                        <th className="p-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Hostname</th>
                                        <th className="p-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">OS</th>
                                        <th className="p-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">IP Address</th>
                                        <th className="p-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Version</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {agentsByLwsId.map(agent => (
                                        <tr key={agent.hostname} className="hover:bg-slate-700/50">
                                            <td className="p-2 font-semibold text-gray-200">{agent.hostname}</td>
                                            <td className="p-2"><div className="flex items-center gap-2"><div className="w-5 h-5">{osIcons[agent.os] ? React.createElement(osIcons[agent.os]) : null}</div> {agent.os}</div></td>
                                            <td className="p-2 font-mono text-gray-400">{agent.ip_address}</td>
                                            <td className="p-2 text-gray-400">{agent.agent_version}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {agentsByLwsId.length === 0 && (
                                <p className="text-gray-500 text-center p-8">No agents currently connected to this LWServer.</p>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Select an LWServer to view connected agents</p>
                    </div>
                )}
             </div>
        </div>
    );
};

export default LWServerFleetView;
