package com.example.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.models.Machine;

public interface MachineRepository extends JpaRepository<Machine, Long> {
	 List<Machine> findByEtat(String etat);

}
