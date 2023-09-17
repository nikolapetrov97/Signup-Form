import { useState, useEffect } from "react";

function useWebSocket({
  socketUrl,
  retry: defaultRetry = 3,
  retryInterval = 1500,
}: {
  socketUrl: string;
  retry?: number;
  retryInterval?: number;
}) {
  const [data, setData] = useState<{
    message: { type: string; data: any[] };
    timestamp: EpochTimeStamp;
  }>();

  const [send, setSend] = useState<any>(() => () => undefined);
  const [retry, setRetry] = useState(defaultRetry);
  const [readyState, setReadyState] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(socketUrl);
    ws.onopen = () => {
      console.log("Connected to socket");
      setReadyState(true);

      setSend(() => {
        return (data: any) => {
          try {
            const d = JSON.stringify(data);
            ws.send(d);
            return true;
          } catch (err) {
            return false;
          }
        };
      });

      ws.onmessage = (event) => {
        const msg = formatMessage(event.data);
        setData({ message: msg, timestamp: getTimestamp() });
      };
    };

    ws.onclose = () => {
      setReadyState(false);
      // retry logic
      if (retry > 0) {
        setTimeout(() => {
          setRetry((retry) => retry - 1);
        }, retryInterval);
      }
    };
    return () => {
      if (ws.readyState === 1) {
        ws.close();
      }
    };
  }, [retry, retryInterval, socketUrl]);

  return { send, data, readyState };
}

const formatMessage = (data: any) => {
  try {
    const parsed = JSON.parse(data);
    return parsed;
  } catch (err) {
    return data;
  }
};

function getTimestamp() {
  return new Date().getTime();
}

export default useWebSocket;
