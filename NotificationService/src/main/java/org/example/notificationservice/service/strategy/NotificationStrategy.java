package org.example.notificationservice.service.strategy;

public interface NotificationStrategy {
    void send(String userId, String message);
}
