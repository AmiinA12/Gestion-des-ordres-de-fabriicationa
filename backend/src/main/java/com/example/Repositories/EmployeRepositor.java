package com.example.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.models.Employe;

public interface EmployeRepositor extends JpaRepository<Employe, Long>  {
	  List<Employe> findByMachineAssigneeId(Long machineId);
	  List<Employe> findByPoste(String poste);

}
