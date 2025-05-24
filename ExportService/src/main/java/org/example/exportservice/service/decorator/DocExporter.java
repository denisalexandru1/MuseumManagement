package org.example.exportservice.service.decorator;

public class DocExporter implements Exporter {

    private final Exporter delegate;

    public DocExporter(Exporter delegate) {
        this.delegate = delegate;
    }

    @Override
    public String export(Object data) {
        // TODO: Implement real logic to serialize to DOC format
        return "DOC Export:\n" + delegate.export(data);
    }
}
