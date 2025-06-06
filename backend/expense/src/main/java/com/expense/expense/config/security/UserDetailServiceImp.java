package com.expense.expense.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.expense.expense.config.security.dto.AuthResponseDto;
import com.expense.expense.dto.AuthLoginRequestDto;
import com.expense.expense.dto.UserRegisterDto;
import com.expense.expense.entity.UserEntity;
import com.expense.expense.exception.UserException;
import com.expense.expense.exception.UserExceptionEnum;
import com.expense.expense.mapper.UserMapper;
import com.expense.expense.repository.UserRepository;
import com.expense.expense.utils.JwtUtils;

@Service
public class UserDetailServiceImp implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    PasswordEncoder passwordEncoder;
    
    @Autowired
    UserMapper userMapper;
    

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByUsername(username)
            .orElseThrow(() -> new UserException(UserExceptionEnum.USER_NOT_FOUND));

        return userEntity;
    }

    public AuthResponseDto loginUser(AuthLoginRequestDto authLoginRequestDto){
        String username = authLoginRequestDto.getUsername();
        String password = authLoginRequestDto.getPassword();
        Integer[] id = new Integer[1];
        Authentication authenticate = this.authenticate(username,password,id);
        SecurityContextHolder.getContext().setAuthentication(authenticate);

        String accesToken = jwtUtils.generateToken(authenticate);
        AuthResponseDto authResponseDto = new AuthResponseDto(id[0],username,JwtUtils.parseAuthoritiesToString(authenticate),"User loged successfuly", accesToken, true);
        return authResponseDto;
    }
    
    public Authentication authenticate(String username, String password,Integer[] id){
        UserEntity userEntity = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException(username));
        id[0] = userEntity.getId();
        if(!passwordEncoder.matches(password, userEntity.getPassword()))
            throw new BadCredentialsException("Invalid password");
        CustomPrincipal customPrincipal = new CustomPrincipal(userEntity.getId(),userEntity.getUsername());
        return new UsernamePasswordAuthenticationToken(customPrincipal, userEntity.getPassword(),userEntity.getAuthorities());
    }

    public AuthResponseDto createUser(UserRegisterDto userRegisterDto){
        UserEntity user = userMapper.userRegisterDtoToUser(userRegisterDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setAccountNoExpired(true);
        user.setAccountNoLocked(true);
        user.setCredentialNoExpired(true);
        user.setEnabled(true);
        UserEntity newUser = userRepository.save(user);
        CustomPrincipal customPrincipal = new CustomPrincipal(user.getId(),user.getUsername());

        Authentication authentication = new UsernamePasswordAuthenticationToken(customPrincipal, user.getPassword(), user.getAuthorities());

        String accessToken = jwtUtils.generateToken(authentication);
        AuthResponseDto authResponseDto = new AuthResponseDto(newUser.getId(),user.getUsername(),JwtUtils.parseAuthoritiesToString(authentication),"User created successfuly", accessToken, true);
        return authResponseDto;
    }
}
