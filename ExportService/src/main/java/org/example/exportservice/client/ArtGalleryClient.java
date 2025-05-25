package org.example.exportservice.client;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Component
public class ArtGalleryClient {

    private final WebClient webClient = WebClient.create("http://localhost:8091/api/gallery");

    public List<Map> getArtworks() {
        return webClient.get()
                .uri("/artwork")
                .retrieve()
                .bodyToFlux(Map.class)
                .collectList()
                .block();
    }
}
