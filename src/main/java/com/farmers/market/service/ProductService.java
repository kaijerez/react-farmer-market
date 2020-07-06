package com.farmers.market.service;

import com.farmers.market.model.Product;
import com.farmers.market.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public Product getProduct(long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> getProducts(){
        return productRepository.findAll();
    }

    public void deleteProducts(long id) {
        productRepository.deleteById(id);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> filterProductByFarm(String farm){
        return productRepository.filterProductByFarm(farm);
    }
}
