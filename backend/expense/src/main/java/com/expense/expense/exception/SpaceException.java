package com.expense.expense.exception;

import lombok.Getter;

@Getter
public class SpaceException extends RuntimeException {
    private final SpaceExceptionEnum exception;
    public SpaceException(SpaceExceptionEnum exceptionEnum) {
        super(exceptionEnum.getMessage());
        this.exception = exceptionEnum;
    }
    
}
