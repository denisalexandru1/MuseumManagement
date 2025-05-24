package org.example.artgalleryservice.repository;

import org.example.artgalleryservice.entity.Artist;
import org.example.artgalleryservice.entity.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ArtworkRepository extends JpaRepository<Artwork, UUID> {
    List<Artwork> findByTitleContainingIgnoreCase(String title);
    List<Artwork> findByTypeContainingIgnoreCase(String type);

    List<Artwork> findByArtistNameIgnoreCaseAndTypeContainingIgnoreCase(String artistName, String type);
    List<Artwork> findByArtistNameIgnoreCase(String artistName);
}
