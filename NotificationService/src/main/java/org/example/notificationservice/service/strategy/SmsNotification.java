package org.example.notificationservice.service.strategy;

import org.springframework.stereotype.Component;

@Component("sms")
public class SmsNotification implements NotificationStrategy {

    @Override
    public void send(String userId, String message) {
        System.out.println("SMS sent to user " + userId + ": " + message);
    }
}
