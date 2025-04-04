package com.expense.expense.config.security.filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;


import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.expense.expense.config.security.CustomPrincipal;
import com.expense.expense.entity.UserEntity;
import com.expense.expense.exception.UserException;
import com.expense.expense.exception.UserExceptionEnum;
import com.expense.expense.repository.UserRepository;
import com.expense.expense.utils.JwtUtils;
import jakarta.servlet.http.Cookie;
import jakarta.security.auth.message.AuthException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthenticationFilter extends OncePerRequestFilter {

    private JwtUtils jwtUtils;
    private UserRepository userRepository;

    public AuthenticationFilter(JwtUtils jwtUtils, UserRepository userRepository){
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        String jwtToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        var cookies = request.getCookies();
        if (cookies != null) {
            Arrays.stream(cookies)
                    .filter(cookie -> cookie.getName()
                            .equals("authToken"))
                    .map(Cookie::getValue)
                    .findFirst()
                    .ifPresent(this::setInformationContext);
        }
        filterChain.doFilter(request, response);
    }

    private void setInformationContext(String jwtToken) {
        DecodedJWT decodedJWT = jwtUtils.validateToken(jwtToken);
        var username = jwtUtils.extractUsername(decodedJWT);
        String stringAuthorities = jwtUtils.getClaim(decodedJWT, "authorities").asString();
        Collection<? extends GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(stringAuthorities);
        UserEntity user = userRepository.findByUsername(username).orElseThrow(() -> new UserException(UserExceptionEnum.USER_NOT_FOUND));
        CustomPrincipal customPrincipal = new CustomPrincipal(user.getId(),user.getUsername());
        Authentication authentication = new UsernamePasswordAuthenticationToken(customPrincipal, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
    
    
}
