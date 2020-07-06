package com.farmers.market.repository.custom;

import com.farmers.market.model.Product;

import java.util.List;

public interface CustomProductRepository {
     List<Product> filterProductByFarm(String farm);
}
