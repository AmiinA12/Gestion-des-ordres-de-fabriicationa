package com.example.Controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Machine;
import com.example.services.MachineService;

@RestController
@RequestMapping("/api/machines")
@CrossOrigin(origins = "http://localhost:4200")
public class MachineController {
	@Autowired
	private  MachineService machineService;
	
	 @GetMapping
	    public List<Machine> getAllMachines() {
	        return machineService.getAllMachines();
	    }

	  @PostMapping
	    public ResponseEntity<Machine> createMachine(@RequestBody Machine machine) {
	        // Si la machine a une date de maintenance à ajouter
	        if (machine.getDerniereMaintenance() == null) {
	            machine.setDerniereMaintenance(LocalDateTime.now()); // Ajoute la date actuelle si null
	        }
	        
	        // Enregistrer la machine avec la date de maintenance
	        Machine savedMachine = machineService.saveMachine(machine);
	        return ResponseEntity.ok(savedMachine);
	    }
	    @GetMapping("/{id}")
	    public ResponseEntity<Machine> getMachineById(@PathVariable Long id) {
	        Machine machine = machineService.getMachineById(id);
	        return machine != null ? ResponseEntity.ok(machine) : ResponseEntity.notFound().build();
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<Machine> updateMachine(@PathVariable Long id, @RequestBody Machine machine) {
	        // Vérifie que l'ID du chemin correspond à celui du body
	        if (!id.equals(machine.getId())) {
	            return ResponseEntity.badRequest().build();
	        }

	        // Récupérer l'ancienne machine de la base pour conserver les valeurs non modifiées
	        Machine existingMachine = machineService.getMachineById(id);
	        if (existingMachine == null) {
	            return ResponseEntity.notFound().build();
	        }

	        // Mettre à jour les champs
	        existingMachine.setNom(machine.getNom());
	        existingMachine.setEtat(machine.getEtat());
	        existingMachine.setDerniereMaintenance(machine.getDerniereMaintenance());

	        Machine updatedMachine = machineService.saveMachine(existingMachine);
	        return ResponseEntity.ok(updatedMachine);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteMachine(@PathVariable Long id) {
	        machineService.deleteMachine(id);
	        return ResponseEntity.noContent().build();
	    }

	    @GetMapping("/etat/{etat}")
	    public List<Machine> getMachinesByEtat(@PathVariable String etat) {
	        return machineService.getMachinesByEtat(etat);
	    }

	    @PostMapping("/{id}/maintenance")
	    public ResponseEntity<Machine> planifierMaintenance(@PathVariable Long id, @RequestBody  LocalDateTime dateMaintenance) {
	        Machine machine = machineService.planifierMaintenance(id, dateMaintenance);
	        return machine != null ? ResponseEntity.ok(machine) : ResponseEntity.notFound().build();
	    }

}
