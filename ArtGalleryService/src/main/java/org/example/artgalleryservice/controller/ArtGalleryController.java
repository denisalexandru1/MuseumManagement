package org.example.artgalleryservice.controller;

import org.example.artgalleryservice.dto.RetrieveArtworkDto;
import org.example.artgalleryservice.dto.UpdateArtworkDto;
import org.example.artgalleryservice.entity.Artist;
import org.example.artgalleryservice.entity.Artwork;
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
    public ResponseEntity<Artwork> createArtwork(@RequestBody UpdateArtworkDto artwork) {
        return ResponseEntity.ok(artGalleryService.createArtwork(artwork));
    }

    @PutMapping("/artwork/{id}")
    public ResponseEntity<Artwork> updateArtwork(@PathVariable UUID id, @RequestBody UpdateArtworkDto artwork) {
        return ResponseEntity.ok(artGalleryService.updateArtwork(id, artwork));
    }

    @DeleteMapping("/artwork/{id}")
    public ResponseEntity<Void> deleteArtwork(@PathVariable UUID id) {
        artGalleryService.deleteArtwork(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/artwork")
    public ResponseEntity<List<RetrieveArtworkDto>> getAllArtworks() {
        List<Artwork> artworks = artGalleryService.getAllArtworks();
        List<RetrieveArtworkDto> dtoList = artworks.stream()
                .map(RetrieveArtworkDto::new)
                .toList();
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/artwork/search")
    public ResponseEntity<List<RetrieveArtworkDto>> searchAndFilterArtworks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String artist,
            @RequestParam(required = false) String type) {

        List<Artwork> artworks = artGalleryService.searchAndFilterArtworks(title, artist, type);
        List<RetrieveArtworkDto> dtoList = artworks.stream().map(RetrieveArtworkDto::new).toList();
        return ResponseEntity.ok(dtoList);
    }
}
