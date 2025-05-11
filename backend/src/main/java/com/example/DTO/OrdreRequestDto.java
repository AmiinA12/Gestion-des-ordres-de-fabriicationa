package com.example.DTO;

import java.time.LocalDate;

import lombok.Data;

@Data
public class OrdreRequestDto {
	private String projet;
    private int quantite;
    private LocalDate date;
    private String etat;

    private Long produitId;
    private Long machineId;
    private Long employeId;
}
