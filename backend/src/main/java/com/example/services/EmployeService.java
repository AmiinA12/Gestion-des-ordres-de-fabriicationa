package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Repositories.EmployeRepositor;
import com.example.models.Employe;
import com.example.models.Machine;

@Service
public class EmployeService {
	@Autowired
	private  EmployeRepositor employeRepository;

   
  
    public List<Employe> getAllEmployes() {
        return employeRepository.findAll();
    }

    public Employe getEmployeById(Long id) {
        return employeRepository.findById(id).orElse(null);
    }

    public Employe saveEmploye(Employe employe) {
        return employeRepository.save(employe);
    }

    public void deleteEmploye(Long id) {
        employeRepository.deleteById(id);
    }

    public List<Employe> getEmployesByPoste(String poste) {
        return employeRepository.findByPoste(poste);
    }

    public Employe assignerMachine(Long employeId, Machine machine) {
        Employe employe = getEmployeById(employeId);
        if (employe != null) {
            employe.setMachineAssignee(machine);
            return saveEmploye(employe);
        }
        return null;
    }
}


