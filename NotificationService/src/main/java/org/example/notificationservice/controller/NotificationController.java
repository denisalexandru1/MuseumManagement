package org.example.notificationservice.controller;

import org.example.notificationservice.model.NotificationRequest;
import org.example.notificationservice.service.NotificationDispatcher;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationDispatcher dispatcher;

    public NotificationController(NotificationDispatcher dispatcher) {
        this.dispatcher = dispatcher;
    }

    @PostMapping
    public void sendNotification(@RequestBody NotificationRequest request) {
        dispatcher.dispatch(request.getUserId(), request.getMessage(), request.getChannelType());
    }
}
