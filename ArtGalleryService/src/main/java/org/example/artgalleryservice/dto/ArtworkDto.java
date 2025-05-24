package org.example.artgalleryservice.dto;

import org.example.artgalleryservice.entity.Artwork;

import java.util.List;
import java.util.UUID;

public class ArtworkDto {
    private UUID id;
    private String title;
    private String type;
    private String description;
    private List<String> imageUrls;
    private String artistName;

    public ArtworkDto() {} // Required for Jackson

    public ArtworkDto(UUID id, String title, String type, String description, List<String> imageUrls, String artistName) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.description = description;
        this.imageUrls = imageUrls;
        this.artistName = artistName;
    }

    public ArtworkDto(Artwork artwork) {
        this(
                artwork.getId(),
                artwork.getTitle(),
                artwork.getType(),
                artwork.getDescription(),
                artwork.getImageUrls(),
                artwork.getArtist() != null ? artwork.getArtist().getName() : "Unknown Artist"
        );
    }

    public UUID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getType() {
        return type;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public String getArtistName() {
        return artistName;
    }
}
