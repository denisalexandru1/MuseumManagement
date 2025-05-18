package org.example.artgalleryservice.repository;

import org.example.artgalleryservice.entity.Artist;
import org.example.artgalleryservice.entity.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ArtworkRepository extends JpaRepository<Artwork, UUID> {
    List<Artwork> findByTitleContainingIgnoreCase(String title);
    List<Artwork> findByArtist(Artist artist);
    List<Artwork> findByTypeContainingIgnoreCase(String type);
}
