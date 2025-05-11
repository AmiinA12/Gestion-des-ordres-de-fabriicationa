package com.example.DTO.Response;

import java.time.LocalDate;

import lombok.Data;
@Data
public class OrdreResponseDto {
	private Long id;
    private String projet;
    private int quantite;
    private LocalDate date;
    private String etat;
    private String produitNom;
    private String machineNom;
    private String employeNom;

}
