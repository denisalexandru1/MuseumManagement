package org.example.notificationservice.service;

import org.example.notificationservice.service.strategy.NotificationStrategy;
import org.example.notificationservice.service.strategy.NotificationStrategyFactory;
import org.springframework.stereotype.Service;

@Service
public class NotificationDispatcher {

    private final NotificationStrategyFactory factory;

    public NotificationDispatcher(NotificationStrategyFactory factory) {
        this.factory = factory;
    }

    public void dispatch(String userId, String message, String channelType) {
        NotificationStrategy strategy = factory.getStrategy(channelType);
        strategy.send(userId, message);
    }
}
