package com.emineturcan.macha.task;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * the class responsible for handling the persistence of
 */

public interface TaskRepository extends JpaRepository<Task, Long> {
}