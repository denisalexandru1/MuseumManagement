package org.example.exportservice.service.decorator;

public class XmlExporter implements Exporter {

    private final Exporter delegate;

    public XmlExporter(Exporter delegate) {
        this.delegate = delegate;
    }

    @Override
    public String export(Object data) {
        return "XML Export:\n" + delegate.export(data);
    }
}
