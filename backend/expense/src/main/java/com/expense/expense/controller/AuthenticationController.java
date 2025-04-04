package com.expense.expense.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expense.expense.config.security.UserDetailServiceImp;
import com.expense.expense.config.security.dto.AuthResponseDto;
import com.expense.expense.dto.AuthLoginRequestDto;
import com.expense.expense.dto.UserRegisterDto;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthenticationController {
    
    @Autowired
    UserDetailServiceImp userDetailsService;

    @Value("${app.auth.domain}")
    private String domain;

    @Value("${app.auth.secure}")
    private boolean secure;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @Value("${app.auth.timeExpiration}")
    private long timeExpiration;

    @Value("${app.auth.sameSite}")
    private String sameSite;
    
    @PostMapping("/log-in")
    public ResponseEntity<AuthResponseDto> login(@RequestBody AuthLoginRequestDto userRequest){
        AuthResponseDto authResponseDto = userDetailsService.loginUser(userRequest);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, tokenCookieHeader(authResponseDto.getJwt()))
                .body(userDetailsService.loginUser(userRequest));
    }

    public String tokenCookieHeader(String token) {
        return ResponseCookie.from("authToken", token)
                .httpOnly(true)
                .secure(secure)
                .domain(domain)
                .path(contextPath)
                .maxAge(timeExpiration)
                .sameSite(sameSite)
                .build()
                .toString();
    }

    @PostMapping("/sign-up")
    public ResponseEntity<AuthResponseDto> signup(@RequestBody UserRegisterDto userRequest) {     
        return new ResponseEntity<>(userDetailsService.createUser(userRequest),HttpStatus.OK);
    }
    
}
