package org.example.notificationservice.service.strategy;

import org.springframework.stereotype.Component;

@Component("email")
public class EmailNotification implements NotificationStrategy {

    @Override
    public void send(String userId, String message) {
        System.out.println("Email sent to user " + userId + ": " + message);
    }
}
