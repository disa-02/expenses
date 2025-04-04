package com.expense.expense.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserExceptionEnum {
    USER_NOT_FOUND("User not found"),
    USERNAME_NOT_VALID("Username already taken"),
    ;
    private final String message;
}
