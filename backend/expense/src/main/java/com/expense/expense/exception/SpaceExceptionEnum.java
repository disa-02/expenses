package com.expense.expense.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SpaceExceptionEnum {
    SPACE_NOT_FOUND("Space not found"),
    OPERATION_NOT_FOUND("Operation not found in that space"),
    ;
    private final String message;
}
