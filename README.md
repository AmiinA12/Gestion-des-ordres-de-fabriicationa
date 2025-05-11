# 🏭 Gestion des Ordres de Fabrication

Ce projet permet de gérer les ordres de fabrication dans un environnement industriel, en assurant la coordination entre les produits, les machines et les employés.



## 📌 Description

L’application facilite la création et le suivi des ordres de fabrication. Elle intègre :
- Création et suivi des ordres de fabrication 
- L’affectation des machines et employés
- Le suivi de l’état des machines et des maintenances

---

## 🧱 Entités principales

### ✅ OrdreFabrication
- `id`
- `projet`
- `produit`
- `quantité`
- `date`
- `état`

### ✅ Produit
- `id`
- `nom`
- `type`
- `stock`
- `fournisseur`

### ✅ Machine
- `id`
- `nom`
- `état`
- `dernière_maintenance`

### ✅ Employé
- `id`
- `nom`
- `poste`
- `machine_assignee`

---

## ⚙️ Fonctionnalités

- 🔄 **CRUD complet** pour toutes les entités
- 🏗️ **Création et suivi** des ordres de fabrication
- 🧩 **Gestion des affectations** de machines et employés
- 🔧 **Suivi des maintenances** et de la disponibilité des machines

---

## 💻 Technologies utilisées

- **Backend** : Spring Boot (Java 17)
- **Frontend** : Angular  
- **Base de données** : MySQL 
- **Conteneurisation** : Docker, Docker Compose
- **Gestion de projet** : Maven

---



