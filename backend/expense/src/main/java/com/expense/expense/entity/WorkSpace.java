package com.expense.expense.entity;

import java.util.ArrayList;
import java.util.List;

import com.expense.expense.entity.operations.Operation;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
public class WorkSpace extends Space {
    @OneToMany (mappedBy = "space", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Operation> operations = new ArrayList<>();
}
