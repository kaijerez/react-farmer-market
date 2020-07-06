package com.farmers.market.repository;

import com.farmers.market.model.Product;
import com.farmers.market.repository.custom.CustomProductRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, CustomProductRepository {

}
