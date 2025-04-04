package com.expense.expense.handlerExeption;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.core.Ordered;

import com.expense.expense.dto.ApiErrorDto;
import com.expense.expense.exception.SpaceException;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SpaceExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(SpaceException.class)
    protected ApiErrorDto handle(SpaceException ex) {
        return new ApiErrorDto(ex.getException().name(), ex.getMessage());
    } 
}
