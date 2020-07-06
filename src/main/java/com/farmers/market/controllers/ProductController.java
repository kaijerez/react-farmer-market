package com.farmers.market.controllers;


import com.farmers.market.model.Product;
import com.farmers.market.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins="http://localhost:3000")
public class ProductController {

    @Autowired
    ProductService prodService;

    @GetMapping
    public List<Product> getProducts(){
        return prodService.getProducts();
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable("id") long id){
        return prodService.getProduct(id);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable("id") long id){
        prodService.deleteProducts(id);
    }

    @PostMapping("/add")
    public Product addProduct(@RequestBody Product prod){
        return prodService.saveProduct(prod);
    }

    @PutMapping("/edit/{id}")
    public Product addProduct(@RequestBody Product product, @PathVariable("id") long id){
       Product dbProd = prodService.getProduct(id);
        if (dbProd.getId() == id){
            dbProd.setName(product.getName());
            dbProd.setPrice(product.getPrice());
            dbProd.setFarmerId(product.getFarmerId());
            dbProd.setMeasurement(product.getMeasurement());
            dbProd.setDescription(product.getDescription());
            return prodService.saveProduct(dbProd);
        } else {
            dbProd.setId(id);	
            return prodService.saveProduct(dbProd);
        }
    }

    @GetMapping("/sort")
    public List<Product> filterProductsByFarmer(@RequestParam("farm") String farmId){
        return prodService.filterProductByFarm(farmId);
    }

}
