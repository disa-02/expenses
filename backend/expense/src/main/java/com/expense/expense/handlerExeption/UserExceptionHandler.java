package com.expense.expense.handlerExeption;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.expense.expense.dto.ApiErrorDto;
import com.expense.expense.exception.UserException;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class UserExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UserException.class)
    protected ApiErrorDto handle(UserException ex) {
        return new ApiErrorDto(ex.getException().name(), ex.getMessage());
    } 
}
