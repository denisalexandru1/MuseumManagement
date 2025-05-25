package org.example.artgalleryservice.repository;

import org.example.artgalleryservice.entity.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ArtworkRepository extends JpaRepository<Artwork, UUID> {
    List<Artwork> findByTitleContainingIgnoreCase(String title);
    List<Artwork> findByTypeContainingIgnoreCase(String type);

    List<Artwork> findByArtistNameIgnoreCaseAndTypeContainingIgnoreCase(String artistName, String type);
    List<Artwork> findByArtistNameIgnoreCase(String artistName);

    // Interfețe pentru rezultate agregate
    interface TypeCount {
        String getType();
        Long getCount();
    }

    interface ArtistCount {
        String getArtistName();
        Long getCount();
    }

    // Query-uri pentru statistici
    @Query("SELECT a.type as type, COUNT(a) as count FROM Artwork a GROUP BY a.type")
    List<TypeCount> countByType();

    @Query("SELECT ar.name as artistName, COUNT(a) as count FROM Artwork a JOIN a.artist ar GROUP BY ar.name")
    List<ArtistCount> countByArtist();
}
