package org.example.exportservice.service.decorator;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class CsvExporter implements Exporter {

    private final Exporter delegate;

    public CsvExporter(Exporter delegate) {
        this.delegate = delegate;
    }

    @Override
    public String export(Object data) {
        if (data instanceof List) {
            List<Map<String, Object>> list = (List<Map<String, Object>>) data;

            if (list.isEmpty()) {
                return "";
            }

            // Collect all keys from all maps to cover all columns
            Set<String> headers = list.stream()
                    .flatMap(m -> m.keySet().stream())
                    .collect(Collectors.toSet());

            // Header row
            String headerLine = String.join(",", headers);

            // Data rows
            String rows = list.stream()
                    .map(map -> headers.stream()
                            .map(key -> {
                                Object val = map.get(key);
                                if (val instanceof List) {
                                    // Join list values with ';'
                                    return ((List<?>) val).stream()
                                            .map(Object::toString)
                                            .collect(Collectors.joining(";"));
                                }
                                return val == null ? "" : val.toString().replace(",", " "); // avoid commas inside CSV
                            })
                            .collect(Collectors.joining(",")))
                    .collect(Collectors.joining("\n"));

            return headerLine + "\n" + rows;
        }
        return delegate.export(data);
    }
}
