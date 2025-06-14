package org.example.artgalleryservice.service;

import org.example.artgalleryservice.dto.RetrieveArtworkDto;
import org.example.artgalleryservice.dto.UpdateArtworkDto;
import org.example.artgalleryservice.entity.Artist;
import org.example.artgalleryservice.entity.Artwork;
import org.example.artgalleryservice.repository.ArtworkRepository;

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
    Artwork createArtwork(UpdateArtworkDto artwork);
    Artwork updateArtwork(UUID id, UpdateArtworkDto dto);
    void deleteArtwork(UUID id);
    List<Artwork> getAllArtworks();
    List<Artwork> filterArtworksByType(String type);
    List<Artwork> searchArtworksByTitle(String title);

    List<Artwork> filterArtworks(String artistName, String type);

    List<Artwork> searchAndFilterArtworks(String title, String artist, String type);

    List<ArtworkRepository.TypeCount> getArtworkCountByType();
    List<ArtworkRepository.ArtistCount> getArtworkCountByArtist();
}
