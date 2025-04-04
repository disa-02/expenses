package com.expense.expense.exception;

import lombok.Getter;

@Getter
public class UserException extends RuntimeException {
    private final UserExceptionEnum exception;

    public UserException(UserExceptionEnum exceptionEnum) {
        super(exceptionEnum.getMessage());
        this.exception = exceptionEnum;
    }
    
}
