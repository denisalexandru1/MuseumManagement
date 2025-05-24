package org.example.notificationservice.model;

import lombok.*;

@Data
public class NotificationRequest {
    private String userId;
    private String message;
    private String channelType; // email, sms, whatsapp etc.

    public NotificationRequest(String userId, String message, String channelType) {
        this.userId = userId;
        this.message = message;
        this.channelType = channelType;
    }

    public NotificationRequest() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getChannelType() {
        return channelType;
    }

    public void setChannelType(String channelType) {
        this.channelType = channelType;
    }
}
