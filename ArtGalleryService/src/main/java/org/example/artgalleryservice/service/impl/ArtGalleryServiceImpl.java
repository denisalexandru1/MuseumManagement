package org.example.artgalleryservice.service.impl;

import org.example.artgalleryservice.entity.Artist;
import org.example.artgalleryservice.entity.Artwork;
import org.example.artgalleryservice.repository.ArtistRepository;
import org.example.artgalleryservice.repository.ArtworkRepository;
import org.example.artgalleryservice.service.ArtGalleryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ArtGalleryServiceImpl implements ArtGalleryService{

    // Facade for the repositories
    private final ArtistRepository artistRepository;
    private final ArtworkRepository artworkRepository;

    public ArtGalleryServiceImpl(ArtistRepository artistRepository, ArtworkRepository artworkRepository) {
        this.artistRepository = artistRepository;
        this.artworkRepository = artworkRepository;
    }

    // Artist methods
    @Override
    public Artist createArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    @Override
    public Artist updateArtist(UUID id, Artist artist) {
        Artist existing = artistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artist not found"));

        existing.setName(artist.getName());
        existing.setBirthDate(artist.getBirthDate());
        existing.setBirthPlace(artist.getBirthPlace());
        existing.setNationality(artist.getNationality());
        existing.setPhotoUrl(artist.getPhotoUrl());

        return artistRepository.save(existing);
    }

    @Override
    public void deleteArtist(UUID id) {
        artistRepository.deleteById(id);
    }

    @Override
    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    @Override
    public List<Artist> searchArtistsByName(String name) {
        return artistRepository.findByNameContainingIgnoreCase(name);
    }

    // Artwork methods
    @Override
    public Artwork createArtwork(Artwork artwork) {
        return artworkRepository.save(artwork);
    }

    @Override
    public Artwork updateArtwork(UUID id, Artwork artwork) {
        Artwork existing = artworkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artwork not found"));

        existing.setTitle(artwork.getTitle());
        existing.setType(artwork.getType());
        existing.setDescription(artwork.getDescription());
        existing.setImageUrls(artwork.getImageUrls());
        existing.setArtist(artwork.getArtist());

        return artworkRepository.save(existing);
    }

    @Override
    public void deleteArtwork(UUID id) {
        artworkRepository.deleteById(id);
    }

    @Override
    public List<Artwork> getAllArtworks() {
        return artworkRepository.findAll();
    }

    @Override
    public List<Artwork> filterArtworksByType(String type) {
        return artworkRepository.findByTypeContainingIgnoreCase(type);
    }

    @Override
    public List<Artwork> searchArtworksByTitle(String title) {
        return artworkRepository.findByTitleContainingIgnoreCase(title);
    }
}
