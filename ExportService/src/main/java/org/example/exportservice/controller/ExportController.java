package org.example.exportservice.controller;

import org.example.exportservice.model.ExportRequest;
import org.example.exportservice.service.ExportService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/export")
public class ExportController {

    private final ExportService exportService;

    public ExportController(ExportService exportService) {
        this.exportService = exportService;
    }

    @PostMapping
    public String export(@RequestBody ExportRequest request) {
        return exportService.exportData(request.getExportType(), request.getEntityType());
    }
}
