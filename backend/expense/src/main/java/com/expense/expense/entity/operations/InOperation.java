package com.expense.expense.entity.operations;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class InOperation extends Operation {

    @Override
    public Double getTransactionValue() {
        return this.getAmount();
    }

    @Override
    public Double calculateAvailableMoney() {
        return this.getAmount();
    }
    
}
