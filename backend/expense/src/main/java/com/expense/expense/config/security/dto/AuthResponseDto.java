package com.expense.expense.config.security.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonPropertyOrder({"username","message","jwt","status"})
public class AuthResponseDto {
    private Integer id;
    private String username;
    private String authorities;
    private String message;
    private String jwt;
    private boolean status;
}
