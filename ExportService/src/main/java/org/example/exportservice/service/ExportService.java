package org.example.exportservice.service;

import org.example.exportservice.service.decorator.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExportService {

    public String exportData(String exportType, String entityType) {
        Object dummyData = getDummyData(entityType);
        Exporter exporter = buildExporter(exportType);
        return exporter.export(dummyData);
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

    private Object getDummyData(String entityType) {
        return switch (entityType.toLowerCase()) {
            case "artwork" -> List.of("Artwork1", "Artwork2");
            case "user" -> List.of("User1", "User2");
            default -> throw new IllegalArgumentException("Unknown entity: " + entityType);
        };
    }
}
