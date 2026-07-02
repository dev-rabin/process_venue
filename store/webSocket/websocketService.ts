import { WebSocketEvent } from "@/types/websocketType";
import type { AppDispatch } from "../index";
import { handleWebSocketEvent } from "./websocketHandler";

class WebSocketService {
    private socket: WebSocket | null = null;

    connect(dispatch: AppDispatch) {
        if (this.socket) return;
        this.socket = new WebSocket("ws://localhost:4000/ws");

        this.socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                handleWebSocketEvent(dispatch, data);
            } catch (error) {
                console.error(error);
            }
        };
        this.socket.onclose = () => {
            this.socket = null;
        };
    }

    disconnect() {
        this.socket?.close();
        this.socket = null;
    }
}

export const websocketService = new WebSocketService();