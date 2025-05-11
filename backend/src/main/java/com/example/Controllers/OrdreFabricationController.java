package com.example.Controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;

import com.example.DTO.OrdreRequestDto;
import com.example.DTO.Response.OrdreResponseDto;
import com.example.models.Employe;
import com.example.models.Machine;
import com.example.models.OrdreFabrication;
import com.example.models.Produit;
import com.example.services.EmployeService;
import com.example.services.MachineService;
import com.example.services.OrdreFabricationService;
import com.example.services.ProduitService;

@RestController
@RequestMapping("/api/ordres")
@CrossOrigin(origins = "http://localhost:4200")
public class OrdreFabricationController {
	@Autowired
	 private  OrdreFabricationService ordreService;
	 @Autowired
	    private ProduitService produitService;
	    
	    @Autowired
	    private MachineService machineService;
	    
	    @Autowired
	    private EmployeService employeService;
	 
	    @GetMapping
	    public List<OrdreResponseDto> getAll() {
	        return ordreService.getAllOrdres().stream().map(ordre -> {
	            OrdreResponseDto dto = new OrdreResponseDto();
	            dto.setId(ordre.getId());
	            dto.setProjet(ordre.getProjet());
	            dto.setQuantite(ordre.getQuantite());
	            dto.setDate(ordre.getDate());
	            dto.setEtat(ordre.getEtat());
	            dto.setProduitNom(ordre.getProduit() != null ? ordre.getProduit().getNom() : null);
	            dto.setMachineNom(ordre.getMachine() != null ? ordre.getMachine().getNom() : null);
	            dto.setEmployeNom(ordre.getEmploye() != null ? ordre.getEmploye().getNom() : null);
	            return dto;
	        }).collect(Collectors.toList());
	    }

	 @PostMapping
	 public OrdreResponseDto createOrdre(@RequestBody OrdreRequestDto dto) {
	     Produit produit = produitService.getProduitById(dto.getProduitId());
	     Machine machine = machineService.getMachineById(dto.getMachineId());
	     Employe employe = employeService.getEmployeById(dto.getEmployeId());

	     OrdreFabrication ordre = new OrdreFabrication(null, dto.getProjet(), dto.getQuantite(), dto.getDate(), dto.getEtat(), produit, machine, employe);
	     ordre = ordreService.saveOrdre(ordre);

	     OrdreResponseDto response = new OrdreResponseDto();
	     response.setId(ordre.getId());
	     response.setProjet(ordre.getProjet());
	     response.setQuantite(ordre.getQuantite());
	     response.setDate(ordre.getDate());
	     response.setEtat(ordre.getEtat());
	     response.setProduitNom(produit.getNom());
	     response.setMachineNom(machine.getNom());
	     response.setEmployeNom(employe != null ? employe.getNom() : null);

	     return response;
	 }

	 @GetMapping("/{id}")
	    public OrdreResponseDto getById(@PathVariable Long id) {
	        OrdreFabrication ordre = ordreService.getOrdreById(id);
	        OrdreResponseDto dto = new OrdreResponseDto();
	        dto.setId(ordre.getId());
	        dto.setProjet(ordre.getProjet());
	        dto.setQuantite(ordre.getQuantite());
	        dto.setDate(ordre.getDate());
	        dto.setEtat(ordre.getEtat());
	        dto.setProduitNom(ordre.getProduit().getNom());
	        dto.setMachineNom(ordre.getMachine().getNom());
	        dto.setEmployeNom(ordre.getEmploye() != null ? ordre.getEmploye().getNom() : null);
	        return dto;
	    }

	    @PutMapping("/{id}")
	    public OrdreResponseDto updateOrdre(@PathVariable Long id, @RequestBody OrdreRequestDto dto) {
	        Produit produit = produitService.getProduitById(dto.getProduitId());
	        Machine machine = machineService.getMachineById(dto.getMachineId());
	        Employe employe = employeService.getEmployeById(dto.getEmployeId());
	        OrdreFabrication updated = new OrdreFabrication(id, dto.getProjet(), dto.getQuantite(), dto.getDate(), dto.getEtat(), produit, machine, employe);
	        updated = ordreService.saveOrdre(updated);

	        OrdreResponseDto response = new OrdreResponseDto();
	        response.setId(updated.getId());
	        response.setProjet(updated.getProjet());
	        response.setQuantite(updated.getQuantite());
	        response.setDate(updated.getDate());
	        response.setEtat(updated.getEtat());
	        response.setProduitNom(produit.getNom());
	        response.setMachineNom(machine.getNom());
	        response.setEmployeNom(employe != null ? employe.getNom() : null);
	        return response;
	    }
	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteOrdre(@PathVariable Long id) {
	        ordreService.deleteOrdre(id);
	        return ResponseEntity.noContent().build();
	    }

	    @GetMapping("/etat/{etat}")
	    public List<OrdreFabrication> getOrdresByEtat(@PathVariable String etat) {
	        return ordreService.getOrdresByEtat(etat);
	    }

}
