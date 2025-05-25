package org.example.exportservice.service;

import org.example.exportservice.client.ArtGalleryClient;
import org.example.exportservice.service.decorator.*;
import org.springframework.stereotype.Service;

@Service
public class ExportService {

    private final ArtGalleryClient artGalleryClient;

    public ExportService(ArtGalleryClient artGalleryClient) {
        this.artGalleryClient = artGalleryClient;
    }

    public String exportData(String exportType, String entityType) {
        Object data = getData(entityType);
        Exporter exporter = buildExporter(exportType);
        return exporter.export(data);
    }

    private Exporter buildExporter(String type) {
        Exporter base = new BaseExporter();

        return switch (type.toLowerCase()) {
            case "csv" -> new CsvExporter(base);
            case "json" -> new JsonExporter(base);
            case "xml" -> new XmlExporter(base);
            case "doc" -> new DocExporter(base);
            default -> throw new IllegalArgumentException("Unknown export type: " + type);
        };
    }

    private Object getData(String entityType) {
        if (!"artwork".equalsIgnoreCase(entityType)) {
            throw new IllegalArgumentException("Currently only artwork export is supported");
        }

        return artGalleryClient.getArtworks();
    }
}
