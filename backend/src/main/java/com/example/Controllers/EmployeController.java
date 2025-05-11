package com.example.Controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.example.DTO.EmployeRequestDto;
import com.example.DTO.Response.EmployeResponseDto;
import com.example.models.Employe;
import com.example.models.Machine;
import com.example.services.EmployeService;
import com.example.services.MachineService;

@RestController
@RequestMapping("/api/employes")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeController {
	 @Autowired
	 private  EmployeService employeService;
	 @Autowired
	 private  MachineService machineService;
	 
	 
	  @GetMapping
	    public List<EmployeResponseDto> getAllEmployes() {
	        return employeService.getAllEmployes().stream().map(employe -> {
	            EmployeResponseDto dto = new EmployeResponseDto();
	            dto.setId(employe.getId());
	            dto.setNom(employe.getNom());
	            dto.setPoste(employe.getPoste());
	            dto.setMachineNom(employe.getMachineAssignee() != null ? employe.getMachineAssignee().getNom() : null);
	            dto.setMachineId(employe.getMachineAssignee() != null ? employe.getMachineAssignee().getId() : null);

	            return dto;
	        }).collect(Collectors.toList());
	    }

	  @PostMapping
	    public EmployeResponseDto createEmploye(@RequestBody EmployeRequestDto dto) {
	        Machine machine = machineService.getMachineById(dto.getMachineId());
	        Employe employe = new Employe();
	        employe.setNom(dto.getNom());
	        employe.setPoste(dto.getPoste());
	        employe.setMachineAssignee(machine);
	        employe = employeService.saveEmploye(employe);

	        EmployeResponseDto response = new EmployeResponseDto();
	        response.setId(employe.getId());
	        response.setNom(employe.getNom());
	        response.setPoste(employe.getPoste());
	        response.setMachineNom(machine != null ? machine.getNom() : null);
	        response.setMachineId(machine != null ? machine.getId() : null);
	        return response;
	    }
	    @GetMapping("/{id}")
	    public ResponseEntity<Employe> getEmployeById(@PathVariable Long id) {
	        Employe employe = employeService.getEmployeById(id);
	        return employe != null ? ResponseEntity.ok(employe) : ResponseEntity.notFound().build();
	    }

	    @PutMapping("/{id}")
	    public EmployeResponseDto updateEmploye(@PathVariable Long id, @RequestBody EmployeRequestDto dto) {
	        Machine machine = machineService.getMachineById(dto.getMachineId());
	        Employe employe = new Employe();
	        employe.setId(id);
	        employe.setNom(dto.getNom());
	        employe.setPoste(dto.getPoste());
	        employe.setMachineAssignee(machine);
	        employe = employeService.saveEmploye(employe);

	        EmployeResponseDto response = new EmployeResponseDto();
	        response.setId(employe.getId());
	        response.setNom(employe.getNom());
	        response.setPoste(employe.getPoste());
	        response.setMachineNom(machine != null ? machine.getNom() : null);
	        response.setMachineId(machine != null ? machine.getId() : null);

	        return response;
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteEmploye(@PathVariable Long id) {
	        employeService.deleteEmploye(id);
	        return ResponseEntity.noContent().build();
	    }

	    @GetMapping("/poste/{poste}")
	    public List<Employe> getEmployesByPoste(@PathVariable String poste) {
	        return employeService.getEmployesByPoste(poste);
	    }

	    @PostMapping("/{employeId}/assigner")
	    public ResponseEntity<Employe> assignerMachine(@PathVariable Long employeId, @RequestBody Long machineId) {
	        Machine machine = machineService.getMachineById(machineId);
	        if (machine == null) {
	            return ResponseEntity.notFound().build();
	        }
	        Employe employe = employeService.assignerMachine(employeId, machine);
	        return employe != null ? ResponseEntity.ok(employe) : ResponseEntity.notFound().build();
	    }
}
