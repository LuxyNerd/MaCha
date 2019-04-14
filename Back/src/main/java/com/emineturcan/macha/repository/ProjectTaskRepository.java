package com.emineturcan.macha.repository;

import com.emineturcan.macha.domain.ProjectTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long> {
}
