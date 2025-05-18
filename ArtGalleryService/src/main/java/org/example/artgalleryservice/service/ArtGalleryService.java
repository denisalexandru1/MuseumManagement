package org.example.artgalleryservice.service;

import org.example.artgalleryservice.entity.Artist;
import org.example.artgalleryservice.entity.Artwork;

import java.util.List;
import java.util.UUID;

public interface ArtGalleryService {
    // Artist operations
    Artist createArtist(Artist artist);
    Artist updateArtist(UUID id, Artist artist);
    void deleteArtist(UUID id);
    List<Artist> getAllArtists();
    List<Artist> searchArtistsByName(String name);

    // Artwork operations
    Artwork createArtwork(Artwork artwork);
    Artwork updateArtwork(UUID id, Artwork artwork);
    void deleteArtwork(UUID id);
    List<Artwork> getAllArtworks();
    List<Artwork> filterArtworksByType(String type);
    List<Artwork> searchArtworksByTitle(String title);
}
