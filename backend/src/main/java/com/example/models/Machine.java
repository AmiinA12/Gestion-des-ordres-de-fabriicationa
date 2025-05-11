package com.example.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
public class Machine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 50)
    private String nom;
    @Column(nullable = false)
    private String etat;
    private LocalDateTime derniereMaintenance;

    @OneToMany(mappedBy = "machineAssignee", cascade = {CascadeType.PERSIST, CascadeType.MERGE},orphanRemoval = true
)
    @JsonIgnore
    private List<Employe> employes = new ArrayList<>();

    @OneToMany(mappedBy = "machine", cascade = {CascadeType.PERSIST, CascadeType.MERGE},orphanRemoval= true
)
    @JsonIgnore
    private List<OrdreFabrication> ordres = new ArrayList<>();
}
