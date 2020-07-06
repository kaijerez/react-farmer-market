package com.farmers.market.service;

import com.farmers.market.model.Farmer;
import com.farmers.market.repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmerService {
    @Autowired
    private FarmerRepository farmerRepository;

    public List<Farmer> getFarmerList() {
        return farmerRepository.findAll();
    }
    public Farmer saveFarmer(Farmer farmer){
        return farmerRepository.save(farmer);
    }
    public void deleteFarmer(long id) {
        farmerRepository.deleteById(id);
    }
    public Farmer getFarmerById(long id){
        return farmerRepository.findById(id).orElse(null);
    }


}
