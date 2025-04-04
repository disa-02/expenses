package com.expense.expense.exception;

import lombok.Getter;

@Getter
public class AccountException extends RuntimeException {
    private final AccountExceptionEnum exception;

    public AccountException(AccountExceptionEnum exceptionEnum) {
        super(exceptionEnum.getMessage());
        this.exception = exceptionEnum;
    }
    
}
