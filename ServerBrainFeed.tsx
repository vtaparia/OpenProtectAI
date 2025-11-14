
import React, { useMemo } from 'react';
import { ServerEvent, AggregatedEvent, AllEventTypes } from '../types';
import LWServerEventItem from './LWServerEventItem';
import LearningUpdateItem from './LearningUpdateItem';
import DirectivePushItem from './DirectivePushItem';
import KnowledgeSyncItem from './KnowledgeSyncItem';
import ProactiveAlertItem from './ProactiveAlertItem';
import WeakPasswordAlerts from './WeakPasswordAlerts';
import AutomatedRemediationItem from './AutomatedRemediationItem';

interface ServerBrainFeedProps {
  events: ServerEvent[];
  onSelectItem: (item: AllEventTypes) => void;
}

const ServerBrainFeed: React.FC<ServerBrainFeedProps> = ({ events, onSelectItem }) => {

  const { weakPasswordEvents, otherEvents } = useMemo(() => {
    const weak: ServerEvent[] = [];
    const others: ServerEvent[] = [];
    
    const reversedEvents = [...events].reverse();

    reversedEvents.forEach(event => {
      if (event.type === 'AGGREGATED_EVENT' && (event.payload as AggregatedEvent).title === 'Weak Password Usage') {
        weak.push(event);
      } else {
        others.push(event);
      }
    });

    return { weakPasswordEvents: weak, otherEvents: others };
  }, [events]);

  return (
    <div className="w-1/4 flex flex-col overflow-hidden bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg">
      <header className="p-4 border-b border-slate-700/50 shrink-0">
        <h2 className="text-lg font-bold text-gray-100">Server Brain & Intelligence</h2>
        <p className="text-sm text-gray-400">Learning, correlation &amp; action</p>
      </header>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {events.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center p-4">
            <p className="text-gray-500">Awaiting processed events...</p>
          </div>
        ) : (
          <>
            <WeakPasswordAlerts events={weakPasswordEvents} onSelectItem={onSelectItem} />
            {otherEvents.map(event => {
              switch (event.type) {
                  case 'AGGREGATED_EVENT':
                      return <LWServerEventItem key={event.id} event={event} onSelectItem={onSelectItem} />;
                  case 'LEARNING_UPDATE':
                      return <LearningUpdateItem key={event.id} event={event} onSelectItem={onSelectItem}/>;
                  case 'DIRECTIVE_PUSH':
                      return <DirectivePushItem key={event.id} event={event} onSelectItem={onSelectItem}/>;
                  case 'KNOWLEDGE_SYNC':
                      return <KnowledgeSyncItem key={event.id} event={event} onSelectItem={onSelectItem}/>;
                  case 'PROACTIVE_ALERT_PUSH':
                      return <ProactiveAlertItem key={event.id} event={event} onSelectItem={onSelectItem}/>;
                  case 'AUTOMATED_REMEDIATION':
                      return <AutomatedRemediationItem key={event.id} event={event} onSelectItem={onSelectItem}/>;
                  default:
                      return null;
              }
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ServerBrainFeed;
