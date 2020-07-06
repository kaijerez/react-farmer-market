package com.farmers.market.repository.custom;

import com.farmers.market.model.Product;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class CustomProductRepositoryImpl implements CustomProductRepository {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Product> filterProductByFarm(String farmerId) {
        Query query = entityManager.createNativeQuery("SELECT * FROM Product as p " +
                "WHERE p.farmer_id = ?", Product.class);
        query.setParameter(1, farmerId + "%");
        return query.getResultList();
    }
}
