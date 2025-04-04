package com.expense.expense.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AccountExceptionEnum {
    ACCOUNT_NOT_FOUND("Account not found"),
    ACCOUNT_OPERATION_NOT_FOUND("Operation not found in that account"),
    ACCOUNT_BALANCE_NOT_FOUND("Account balance not found"),
    ;

    private final String message;

}
