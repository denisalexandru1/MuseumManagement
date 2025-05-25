package org.example.exportservice.service.decorator;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

public class JsonExporter implements Exporter {

    private final Exporter delegate;
    private final ObjectMapper mapper = new ObjectMapper();

    public JsonExporter(Exporter delegate) {
        this.delegate = delegate;
    }

    @Override
    public String export(Object data) {
        try {
            if (data instanceof List) {
                return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(data);
            } else {
                return delegate.export(data);
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to export JSON", e);
        }
    }
}
