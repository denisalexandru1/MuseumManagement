package org.example.notificationservice.service.observer;

import org.example.notificationservice.service.NotificationDispatcher;
import org.springframework.stereotype.Component;

@Component
public class NotificationEventListener implements NotificationObserver {

    private final NotificationDispatcher dispatcher;

    public NotificationEventListener(NotificationDispatcher dispatcher) {
        this.dispatcher = dispatcher;
    }

    @Override
    public void onUserUpdate(String userId, String message) {
        dispatcher.dispatch(userId, message, "email");
        dispatcher.dispatch(userId, message, "sms");
        dispatcher.dispatch(userId, message, "whatsapp");
    }
}
