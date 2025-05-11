package com.example.models;



import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String nom;
    @Column(nullable = false, length = 50)
    private String type;
    @Column(nullable = false)
    private int stock;
    @Column(length = 100)
    private String fournisseur;

    @OneToMany(mappedBy = "produit", cascade= {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH },orphanRemoval = true)
    @JsonIgnore
    private List<OrdreFabrication> ordres = new ArrayList<>();
}

