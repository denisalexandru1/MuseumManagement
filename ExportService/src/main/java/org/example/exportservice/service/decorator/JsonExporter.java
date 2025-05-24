package org.example.exportservice.service.decorator;

public class JsonExporter implements Exporter {

    private final Exporter delegate;

    public JsonExporter(Exporter delegate) {
        this.delegate = delegate;
    }

    @Override
    public String export(Object data) {
        return "JSON Export:\n" + delegate.export(data);
    }
}
