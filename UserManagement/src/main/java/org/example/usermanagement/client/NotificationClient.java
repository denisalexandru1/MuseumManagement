package org.example.usermanagement.client;

import org.example.usermanagement.model.NotificationRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class NotificationClient {

    private final WebClient webClient;

    public NotificationClient() {
        this.webClient = WebClient.create("http://localhost:8092/api/notifications");
    }

    public void sendNotification(NotificationRequest request) {
        webClient.post()
                .bodyValue(request)
                .retrieve()
                .bodyToMono(Void.class)
                .block();
    }
}
