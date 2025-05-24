package org.example.exportservice.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExportRequest {
    private String exportType; // csv, json, xml, doc
    private String entityType; // artwork, user

    public String getExportType() {
        return exportType;
    }

    public void setExportType(String exportType) {
        this.exportType = exportType;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }
}
