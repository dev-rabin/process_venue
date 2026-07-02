"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { websocketService } from "@/store/webSocket/websocketService";

interface WebSocketProviderProps {
  children: React.ReactNode;
}

export default function WebSocketProvider({children,}: WebSocketProviderProps){
  const dispatch = useAppDispatch();

  useEffect(() => {
    websocketService.connect(dispatch);
    return () => {
      websocketService.disconnect();
    };
  }, [dispatch]);

  return <>{children}</>;
}
