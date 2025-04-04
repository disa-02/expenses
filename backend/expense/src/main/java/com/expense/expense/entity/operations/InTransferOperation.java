package com.expense.expense.entity.operations;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
public class InTransferOperation extends Operation {

    @OneToOne(optional = true)
    OutTransferOperation transferOperation;

    @Override
    public Double getTransactionValue() {
        return this.getAmount();
    }

    @Override
    public Double calculateAvailableMoney() {
        return this.getAmount();
    }
    
}
