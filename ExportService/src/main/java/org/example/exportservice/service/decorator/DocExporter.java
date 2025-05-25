package org.example.exportservice.service.decorator;

import java.util.List;
import java.util.Map;

public class DocExporter implements Exporter {

    private final Exporter delegate;

    public DocExporter(Exporter delegate) {
        this.delegate = delegate;
    }

    @Override
    public String export(Object data) {
        if (data instanceof List) {
            List<Map<String, Object>> list = (List<Map<String, Object>>) data;

            StringBuilder sb = new StringBuilder();
            sb.append("Artworks Export Document\n\n");

            int count = 1;
            for (Map<String, Object> artwork : list) {
                sb.append("Artwork #").append(count++).append("\n");
                for (Map.Entry<String, Object> entry : artwork.entrySet()) {
                    sb.append(entry.getKey()).append(": ");
                    Object value = entry.getValue();
                    if (value instanceof List) {
                        sb.append(String.join(", ", ((List<?>) value).stream().map(Object::toString).toList()));
                    } else {
                        sb.append(value == null ? "" : value.toString());
                    }
                    sb.append("\n");
                }
                sb.append("\n");
            }

            return sb.toString();
        }
        return delegate.export(data);
    }
}
