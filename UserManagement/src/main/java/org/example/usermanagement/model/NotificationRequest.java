package org.example.usermanagement.model;

public class NotificationRequest {
    private String userId;
    private String message;
    private String channelType; // email, sms, whatsapp etc.

    public NotificationRequest(String string, String message, String all) {
        this.userId = string;
        this.message = message;
        this.channelType = all;
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
