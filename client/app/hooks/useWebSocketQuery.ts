import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useWebSocketQuery<T>(
  queryKey: string[],
  socketUrl: string,
  eventName: string,
  options = {}
) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [data, setData] = useState<T | null>(null);

  // Socket.IO 연결 설정
  useEffect(() => {
    const socketInstance = io(socketUrl, {
      transports: ["websocket"],
      path: "/socket.io/",
    });

    socketInstance.on("connect", () => {
      console.log("WebSocket connected");
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socketInstance.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [socketUrl]);

  // 이벤트 리스너 설정
  useEffect(() => {
    if (!socket) return;

    const handleData = (receivedData: T) => {
      setData(receivedData);
    };

    socket.on(eventName, handleData);

    return () => {
      socket.off(eventName, handleData);
    };
  }, [socket, eventName]);

  // TanStack Query 사용
  return useQuery({
    queryKey,
    queryFn: () => Promise.resolve(data),
    enabled: !!socket && socket.connected,
    ...options,
  });
}
