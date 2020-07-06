package com.farmers.market.controllers;

import com.farmers.market.model.Farmer;
import com.farmers.market.service.FarmerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/farmers")
@CrossOrigin(origins="http://localhost:3000")
public class FarmersController {

    @Autowired
    FarmerService farmerService;

    @GetMapping
    public List<Farmer> getFarmers(){
        return farmerService.getFarmerList();
    }

    @PostMapping("/add")
    public Farmer addFarmer(@RequestBody Farmer farmer){
        return farmerService.saveFarmer(farmer);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteFarmer(@PathVariable("id") long id){

        farmerService.deleteFarmer(id);
    }

    @GetMapping("/{id}")
    public Farmer getFarmerById(@PathVariable("id") long id){

        return farmerService.getFarmerById(id);
    }

    @PutMapping("/edit/{id}")
    public Farmer updateProduct(@RequestBody Farmer farmer, @PathVariable("id") long id){
        Farmer dbFarmer = farmerService.getFarmerById(id);
        if (dbFarmer.getId() == id){
            dbFarmer.setLastName(farmer.getLastName());
            dbFarmer.setCompanyName(farmer.getCompanyName());
            dbFarmer.setEmail(farmer.getEmail());
            dbFarmer.setFirstName(farmer.getFirstName());
            dbFarmer.setDescription(farmer.getDescription());
            return farmerService.saveFarmer(dbFarmer);
        } else {
            dbFarmer.setId(id);
            return farmerService.saveFarmer(dbFarmer);
        }
    }
}
