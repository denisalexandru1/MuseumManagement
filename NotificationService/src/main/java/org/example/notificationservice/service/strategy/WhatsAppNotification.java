package org.example.notificationservice.service.strategy;

import org.springframework.stereotype.Component;

@Component("whatsapp")
public class WhatsAppNotification implements NotificationStrategy {

    @Override
    public void send(String userId, String message) {
        System.out.println("WhatsApp message sent to user " + userId + ": " + message);
    }
}
