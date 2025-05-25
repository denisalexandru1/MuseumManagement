package org.example.exportservice.client;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Component
public class UsersClient {

    private final WebClient webClient = WebClient.create("http://localhost:8090/api");

    public List<Map> getUsers() {
        return webClient.get()
                .uri("/users")
                .retrieve()
                .bodyToFlux(Map.class)
                .collectList()
                .block();
    }
}
