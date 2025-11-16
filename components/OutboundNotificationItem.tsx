
import React from 'react';
import { ServerEvent, OutboundNotification, AllEventTypes } from '../types';
import { SlackIcon, TeamsIcon, EmailIcon } from './icons/NotificationIcons';

interface OutboundNotificationItemProps {
  event: ServerEvent;
  onSelectItem: (item: AllEventTypes) => void;
}

const channelConfig = {
    'Slack': { icon: SlackIcon, color: 'text-pink-400', bg: 'bg-pink-500/10', hoverBg: 'hover:bg-pink-500/20', border: 'border-pink-500' },
    'MS Teams': { icon: TeamsIcon, color: 'text-indigo-400', bg: 'bg-indigo-500/10', hoverBg: 'hover:bg-indigo-500/20', border: 'border-indigo-500' },
    'Email': { icon: EmailIcon, color: 'text-gray-400', bg: 'bg-gray-500/10', hoverBg: 'hover:bg-gray-500/20', border: 'border-gray-500' },
};

const OutboundNotificationItem: React.FC<OutboundNotificationItemProps> = ({ event, onSelectItem }) => {
  const payload = event.payload as OutboundNotification;
  const config = channelConfig[payload.channel];

  return (
    <div 
        className={`p-3 rounded-lg ${config.bg} ${config.hoverBg} border-l-4 ${config.border} overflow-hidden cursor-pointer transition-colors duration-300`}
        onClick={() => onSelectItem(event)}
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 mt-1 ${config.color}`}>
          <config.icon />
        </div>
        <div className="flex-1">
          <p className={`text-sm font-bold ${config.color.replace('400', '300')}`}>Notification Sent via {payload.channel}</p>
          <p className="text-xs text-gray-300 mt-1">
            Triggered by playbook <span className="font-semibold">{payload.playbook_name}</span> for alert: <span className="font-semibold">"{payload.alert_title}"</span>
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${config.bg} ${config.color.replace('400', '300')}`}>
              To: {payload.destination}
            </span>
            <span className="text-xs text-gray-500">{new Date(event.timestamp).toLocaleTimeString('en-US')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutboundNotificationItem;
