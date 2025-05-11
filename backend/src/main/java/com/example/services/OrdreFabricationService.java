package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Repositories.OrdreFabricationRepository;
import com.example.models.OrdreFabrication;

@Service
public class OrdreFabricationService {
@Autowired
private  OrdreFabricationRepository ordreFabricationRepository;
public List<OrdreFabrication> getAllOrdres() {
    return ordreFabricationRepository.findAll();
}

public OrdreFabrication getOrdreById(Long id) {
    return ordreFabricationRepository.findById(id).orElse(null);
}

public OrdreFabrication saveOrdre(OrdreFabrication ordre) {
    return ordreFabricationRepository.save(ordre);
}

public void deleteOrdre(Long id) {
    ordreFabricationRepository.deleteById(id);
}

public List<OrdreFabrication> getOrdresByEtat(String etat) {
    return ordreFabricationRepository.findByEtat(etat);
}

}
