package com.devglan.config;

import com.google.gson.Gson;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class SocketHandler extends TextWebSocketHandler {
	
	List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message)
			throws InterruptedException, IOException {
                System.out.println("enviando..." + message);
		Map<String, String> value = new Gson().fromJson(message.getPayload(), Map.class);
		for(WebSocketSession webSocketSession : sessions) {
			System.out.println("Hello " + value.get("name") + " !");
			webSocketSession.sendMessage(new TextMessage("Hello " + value.get("name") + " !"));
		
		}
			//session.sendMessage(new TextMessage("Hello " + value.get("name") + " !"));
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("conectou" + session);

		//the messages will be broadcasted to all users.
		sessions.add(session);
		System.out.println("conectados" + sessions);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
		System.out.println("encerrou");
		sessions.remove(session);
		System.out.println("conectados" + sessions);

		
	}

}
