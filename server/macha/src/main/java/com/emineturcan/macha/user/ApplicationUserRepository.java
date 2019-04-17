package com.emineturcan.macha.user;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * To manage the persistence layer of this entity
 */
public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {
   //findByUsername later for the authentication
    ApplicationUser findByUsername(String username);
}