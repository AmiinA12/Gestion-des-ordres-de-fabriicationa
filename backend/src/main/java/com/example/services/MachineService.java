package com.example.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Repositories.MachineRepository;
import com.example.models.Machine;

@Service
public class MachineService {

	@Autowired						 
	  private  MachineRepository machineRepository;

	   
	   
	    public List<Machine> getAllMachines() {
	        return machineRepository.findAll();
	    }

	    public Machine getMachineById(Long id) {
	        return machineRepository.findById(id).orElse(null);
	    }

	    public Machine saveMachine(Machine machine) {
	        return machineRepository.save(machine);
	    }

	    public void deleteMachine(Long id) {
	        machineRepository.deleteById(id);
	    }

	    public List<Machine> getMachinesByEtat(String etat) {
	        return machineRepository.findByEtat(etat);
	    }

	    public Machine planifierMaintenance(Long id,  LocalDateTime dateMaintenance) {
	        Machine machine = getMachineById(id);
	        if (machine != null) {
	            machine.setDerniereMaintenance(dateMaintenance);
	            machine.setEtat("En maintenance");
	            return saveMachine(machine);
	        }
	        return null;
	    }
	}

