package org.example.artgalleryservice.controller;

import org.example.artgalleryservice.dto.ArtworkDto;
import org.example.artgalleryservice.entity.Artist;
import org.example.artgalleryservice.entity.Artwork;
import org.example.artgalleryservice.repository.ArtworkRepository;
import org.example.artgalleryservice.service.ArtGalleryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/gallery")
public class ArtGalleryController {
    private final ArtGalleryService artGalleryService;

    public ArtGalleryController(ArtGalleryService artGalleryService) {
        this.artGalleryService = artGalleryService;
    }

    // Artist endpoints
    @PostMapping("/artist")
    public ResponseEntity<Artist> createArtist(@RequestBody Artist artist) {
        Artist createdArtist = artGalleryService.createArtist(artist);
        return ResponseEntity.ok(createdArtist);
    }

    @PutMapping("/artist/{id}")
    public ResponseEntity<Artist> updateArtist(@PathVariable UUID id, @RequestBody Artist artist) {
        Artist updatedArtist = artGalleryService.updateArtist(id, artist);
        return ResponseEntity.ok(updatedArtist);
    }

    @DeleteMapping("/artist/{id}")
    public ResponseEntity<Void> deleteArtist(@PathVariable UUID id) {
        artGalleryService.deleteArtist(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/artist")
    public ResponseEntity<List<Artist>> getAllArtists() {
        List<Artist> artists = artGalleryService.getAllArtists();
        return ResponseEntity.ok(artists);
    }

    @GetMapping("/artist/search")
    public ResponseEntity<List<Artist>> searchArtistsByName(@RequestParam String name) {
        List<Artist> artists = artGalleryService.searchArtistsByName(name);
        return ResponseEntity.ok(artists);
    }

    // Artwork endpoints
    @PostMapping("/artwork")
    public ResponseEntity<Artwork> createArtwork(@RequestBody Artwork artwork) {
        Artwork createdArtwork = artGalleryService.createArtwork(artwork);
        return ResponseEntity.ok(createdArtwork);
    }

    @PutMapping("/artwork/{id}")
    public ResponseEntity<Artwork> updateArtwork(@PathVariable UUID id,@RequestBody Artwork artwork) {
        Artwork updatedArtwork = artGalleryService.updateArtwork(id, artwork);
        return ResponseEntity.ok(updatedArtwork);
    }

    @DeleteMapping("/artwork/{id}")
    public ResponseEntity<Void> deleteArtwork(@PathVariable UUID id) {
        artGalleryService.deleteArtwork(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/artwork")
    public ResponseEntity<List<ArtworkDto>> getAllArtworks() {
        List<Artwork> artworks = artGalleryService.getAllArtworks();
        List<ArtworkDto> dtoList = artworks.stream()
                .map(ArtworkDto::new)
                .toList();
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/artwork/search")
    public ResponseEntity<List<ArtworkDto>> searchAndFilterArtworks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String artist,
            @RequestParam(required = false) String type) {

        List<Artwork> artworks = artGalleryService.searchAndFilterArtworks(title, artist, type);
        List<ArtworkDto> dtoList = artworks.stream().map(ArtworkDto::new).toList();
        return ResponseEntity.ok(dtoList);
    }
}
