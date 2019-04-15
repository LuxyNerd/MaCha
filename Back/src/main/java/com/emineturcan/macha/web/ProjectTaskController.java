package com.emineturcan.macha.web;

import com.emineturcan.macha.domain.ProjectTask;
import com.emineturcan.macha.service.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/board")
//access by other service, because no Spring Security
@CrossOrigin
public class ProjectTaskController {
    @Autowired
    private ProjectTaskService projectTaskService;

    @PostMapping("") //@Valid for more detailed error message
    public ResponseEntity<?> addPTToBoard(@Valid @RequestBody ProjectTask projectTask, BindingResult result){
        if(result.hasErrors()){
            Map<String, String> errorMap = new HashMap<>();
            for(FieldError error: result.getFieldErrors()){
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<Map<String, String>>(errorMap,HttpStatus.BAD_REQUEST);
        }
        ProjectTask newProjectTask = projectTaskService.saveOrUpdateProjectTask(projectTask);
        //So until here, my create operation is fnished. And made sure, that summary is not empty
        return new ResponseEntity<ProjectTask>(newProjectTask, HttpStatus.CREATED);
    }
    @GetMapping("/all")
    public Iterable<ProjectTask>getAllProjectTasks(){
        return projectTaskService.findAll();
    }
    @GetMapping("/{projectTask_id}")
    public ResponseEntity<?>getProjectTaskByIdl(@PathVariable Long projectTask_id){
        ProjectTask projectTask = projectTaskService.findById(projectTask_id);
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }
}
