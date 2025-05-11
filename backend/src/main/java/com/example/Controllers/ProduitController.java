package com.example.Controllers;

import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Produit;
import com.example.services.ProduitService;
@RestController
@RequestMapping("/api/produits")
@CrossOrigin(origins = "http://localhost:4200")
public class ProduitController {
	@Autowired
	private  ProduitService produitService;

	 @GetMapping
	    public List<Produit> getAllProduits() {
	        return produitService.getAllProduits();
	    }

	    @PostMapping
	    public ResponseEntity<Produit> createProduit(@Validated @RequestBody Produit produit) {
	        Produit savedProduit = produitService.saveProduit(produit);
	        return ResponseEntity.ok(savedProduit);
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<Produit> getProduitById(@PathVariable Long id) {
	        Produit produit = produitService.getProduitById(id);
	        return produit != null ? ResponseEntity.ok(produit) : ResponseEntity.notFound().build();
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<Produit> updateProduit(@PathVariable Long id, @Validated @RequestBody Produit produit) {
	        if (!id.equals(produit.getId())) {
	            return ResponseEntity.badRequest().build();
	        }
	        Produit updatedProduit = produitService.saveProduit(produit);
	        return ResponseEntity.ok(updatedProduit);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteProduit(@PathVariable Long id) {
	        produitService.deleteProduit(id);
	        return ResponseEntity.noContent().build();
	    }

	    @GetMapping("/type/{type}")
	    public List<Produit> getProduitsByType(@PathVariable String type) {
	        return produitService.getProduitsByType(type);
	    }
}
