package org.example.exportservice.service.decorator;

public class CsvExporter implements Exporter {

    private final Exporter delegate;

    public CsvExporter(Exporter delegate) {
        this.delegate = delegate;
    }

    @Override
    public String export(Object data) {
        // TODO: Real logic would serialize to CSV
        return "CSV Export:\n" + delegate.export(data);
    }
}
