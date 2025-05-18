package org.example.artgalleryservice.repository;

import org.example.artgalleryservice.entity.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ArtistRepository extends JpaRepository<Artist, UUID> {
    List<Artist> findByNameContainingIgnoreCase(String name);
}
