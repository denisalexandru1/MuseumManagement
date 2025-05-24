package org.example.notificationservice.service.observer;

public interface NotificationObserver {
    void onUserUpdate(String userId, String message);
}
