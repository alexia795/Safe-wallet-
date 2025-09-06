type LogEntry = {
  timestamp: string;
  action: string;
  details?: string;
};

let logs: LogEntry[] = [];

export const addLog = (action: string, details?: string) => {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    action,
    details,
  };
  logs.push(entry);
};

export const getLogs = () => logs;
