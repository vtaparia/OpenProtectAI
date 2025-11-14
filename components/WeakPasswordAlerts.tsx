
import React from 'react';
import { ServerEvent, AllEventTypes } from '../types';
import LWServerEventItem from './LWServerEventItem';

interface WeakPasswordAlertsProps {
  events: ServerEvent[];
  onSelectItem: (item: AllEventTypes) => void;
}

const WeakPasswordAlerts: React.FC<WeakPasswordAlertsProps> = ({ events, onSelectItem }) => {
  if (events.length === 0) {
    return null;
  }

  return (
    <div className="p-2 bg-slate-900/50 rounded-lg border border-yellow-500/30 mb-2">
        <h3 className="text-sm font-semibold text-yellow-300 px-1 pb-2">Weak Password Usage Alerts</h3>
        <div className="space-y-2">
            {events.map(event => (
                <LWServerEventItem key={event.id} event={event} onSelectItem={onSelectItem} />
            ))}
        </div>
    </div>
  );
};

export default WeakPasswordAlerts;
