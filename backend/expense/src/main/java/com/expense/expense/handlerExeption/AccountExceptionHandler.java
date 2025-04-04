package com.expense.expense.handlerExeption;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.expense.expense.dto.ApiErrorDto;
import com.expense.expense.exception.AccountException;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class AccountExceptionHandler {
    
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(AccountException.class)
    protected ApiErrorDto handle(AccountException ex) {
        return new ApiErrorDto(ex.getException().name(), ex.getMessage());
    } 
}
