package org.example.notificationservice.service.strategy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class NotificationStrategyFactory {

    private final Map<String, NotificationStrategy> strategies;

    @Autowired
    public NotificationStrategyFactory(Map<String, NotificationStrategy> strategies) {
        this.strategies = strategies;
    }

    public NotificationStrategy getStrategy(String channelType) {
        NotificationStrategy strategy = strategies.get(channelType.toLowerCase());
        if (strategy == null) throw new IllegalArgumentException("Unknown channel type: " + channelType);
        return strategy;
    }
}
