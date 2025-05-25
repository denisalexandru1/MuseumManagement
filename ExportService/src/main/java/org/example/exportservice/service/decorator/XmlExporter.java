package org.example.exportservice.service.decorator;

import java.util.List;
import java.util.Map;

public class XmlExporter implements Exporter {

    private final Exporter delegate;

    public XmlExporter(Exporter delegate) {
        this.delegate = delegate;
    }

    @Override
    public String export(Object data) {
        if (data instanceof List) {
            List<Map<String, Object>> list = (List<Map<String, Object>>) data;

            StringBuilder sb = new StringBuilder();
            sb.append("<artworks>\n");

            for (Map<String, Object> artwork : list) {
                sb.append("  <artwork>\n");
                for (Map.Entry<String, Object> entry : artwork.entrySet()) {
                    String key = entry.getKey();
                    Object value = entry.getValue();

                    if (value instanceof List) {
                        sb.append("    <").append(key).append(">\n");
                        for (Object v : (List<?>) value) {
                            sb.append("      <item>").append(escapeXml(v.toString())).append("</item>\n");
                        }
                        sb.append("    </").append(key).append(">\n");
                    } else {
                        sb.append("    <").append(key).append(">")
                                .append(escapeXml(value == null ? "" : value.toString()))
                                .append("</").append(key).append(">\n");
                    }
                }
                sb.append("  </artwork>\n");
            }

            sb.append("</artworks>");
            return sb.toString();
        }
        return delegate.export(data);
    }

    private String escapeXml(String input) {
        return input.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&apos;");
    }
}
