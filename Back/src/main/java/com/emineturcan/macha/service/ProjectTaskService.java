package com.emineturcan.macha.service;

import com.emineturcan.macha.domain.ProjectTask;
import com.emineturcan.macha.repository.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
logic stuff which we do not really need in repository interface and won't in controller
 */

@Service
public class ProjectTaskService {

    @Autowired
    private ProjectTaskRepository projectTaskRepository;
}
