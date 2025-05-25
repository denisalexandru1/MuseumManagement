package org.example.artgalleryservice.service.impl;

import org.example.artgalleryservice.dto.RetrieveArtworkDto;
import org.example.artgalleryservice.dto.UpdateArtworkDto;
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
    public Artwork createArtwork(UpdateArtworkDto artworkDto) {
        Artist artist = artistRepository.findById(artworkDto.getArtistId())
                .orElseThrow(() -> new RuntimeException("Artist not found"));

        Artwork artwork = new Artwork(
                artworkDto.getTitle(),
                artworkDto.getType(),
                artworkDto.getDescription(),
                artworkDto.getImageUrls(),
                artist
        );
        return artworkRepository.save(artwork);
    }

    @Override
    public Artwork updateArtwork(UUID id, UpdateArtworkDto dto) {
        Artwork existing = artworkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artwork not found"));

        Artist artist = artistRepository.findById(dto.getArtistId())
                .orElseThrow(() -> new RuntimeException("Artist not found"));

        existing.setTitle(dto.getTitle());
        existing.setType(dto.getType());
        existing.setDescription(dto.getDescription());
        existing.setImageUrls(dto.getImageUrls());
        existing.setArtist(artist);

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

    @Override
    public List<Artwork> filterArtworks(String artistName, String type) {
        if (artistName != null && !artistName.isEmpty() && type != null && !type.isEmpty()) {
            return artworkRepository.findByArtistNameIgnoreCaseAndTypeContainingIgnoreCase(artistName, type);
        } else if (artistName != null && !artistName.isEmpty()) {
            return artworkRepository.findByArtistNameIgnoreCase(artistName);
        } else if (type != null && !type.isEmpty()) {
            return artworkRepository.findByTypeContainingIgnoreCase(type);
        } else {
            return artworkRepository.findAll();
        }
    }

    public List<Artwork> searchAndFilterArtworks(String title, String artist, String type) {
        boolean hasTitle = title != null && !title.isBlank();
        boolean hasArtist = artist != null && !artist.isBlank();
        boolean hasType = type != null && !type.isBlank();

        // Dacă există artist și tip
        if (hasArtist && hasType) {
            // Dacă avem și title, trebuie filtrat manual după title (căci repo nu are direct metoda asta)
            List<Artwork> byArtistAndType = artworkRepository.findByArtistNameIgnoreCaseAndTypeContainingIgnoreCase(artist, type);
            if (hasTitle) {
                String lowerTitle = title.toLowerCase();
                return byArtistAndType.stream()
                        .filter(a -> a.getTitle() != null && a.getTitle().toLowerCase().contains(lowerTitle))
                        .toList();
            } else {
                return byArtistAndType;
            }
        }

        // Dacă există doar artist
        if (hasArtist) {
            List<Artwork> byArtist = artworkRepository.findByArtistNameIgnoreCase(artist);
            if (hasTitle) {
                String lowerTitle = title.toLowerCase();
                return byArtist.stream()
                        .filter(a -> a.getTitle() != null && a.getTitle().toLowerCase().contains(lowerTitle))
                        .toList();
            } else {
                return byArtist;
            }
        }

        // Dacă există doar tip
        if (hasType) {
            List<Artwork> byType = artworkRepository.findByTypeContainingIgnoreCase(type);
            if (hasTitle) {
                String lowerTitle = title.toLowerCase();
                return byType.stream()
                        .filter(a -> a.getTitle() != null && a.getTitle().toLowerCase().contains(lowerTitle))
                        .toList();
            } else {
                return byType;
            }
        }

        // Dacă avem doar titlu
        if (hasTitle) {
            return artworkRepository.findByTitleContainingIgnoreCase(title);
        }

        // Dacă nu avem niciun filtru, returnăm toate operele
        return artworkRepository.findAll();
    }

    @Override
    public List<ArtworkRepository.TypeCount> getArtworkCountByType() {
        return artworkRepository.countByType();
    }

    @Override
    public List<ArtworkRepository.ArtistCount> getArtworkCountByArtist() {
        return artworkRepository.countByArtist();
    }
}
