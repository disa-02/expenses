package com.expense.expense.dto;

import java.util.Collections;
import java.util.Map;

public class ApiErrorDto {
    public final String code;
    public final String text;
    public final Map<String, Object> args;

    public ApiErrorDto(String code, String text, Map<String, Object> args) {
        this.code = code;
        this.text = text;
        this.args = args;
    }

    public ApiErrorDto(String code, String text) {
        this(code, text, Collections.emptyMap());
    }
}
