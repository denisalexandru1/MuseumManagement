package org.example.exportservice.service.decorator;

public class BaseExporter implements Exporter {
    @Override
    public String export(Object data) {
        return data.toString();
    }
}
