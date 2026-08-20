package com.autoops.portal.repository;

import com.autoops.portal.entity.Environment;
import com.autoops.portal.entity.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {

    boolean existsByNameAndEnvironment(
            String name,
            Environment environment
    );

    Optional<ServiceEntity> findByNameAndEnvironment(
            String name,
            Environment environment
    );

    boolean existsByNameAndEnvironmentAndIdNot(
            String name,
            Environment environment,
            Long id
    );
}