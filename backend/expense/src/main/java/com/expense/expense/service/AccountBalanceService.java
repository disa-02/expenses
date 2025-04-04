package com.expense.expense.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expense.expense.dto.AccountBalanceDto;
import com.expense.expense.dto.AccountBalanceUpdateDto;
import com.expense.expense.entity.AccountBalance;
import com.expense.expense.entity.WorkSpace;
import com.expense.expense.exception.AccountException;
import com.expense.expense.exception.AccountExceptionEnum;
import com.expense.expense.exception.SpaceException;
import com.expense.expense.exception.SpaceExceptionEnum;
import com.expense.expense.mapper.AccountBalanceMapper;
import com.expense.expense.repository.AccountBalanceRepository;
import com.expense.expense.repository.WorkSpaceRepository;

import jakarta.transaction.Transactional;

@Service
public class AccountBalanceService {

    @Autowired
    AccountBalanceRepository accountBalanceRepository;

    @Autowired
    WorkSpaceRepository workSpaceRepository;

    @Autowired 
    AccountBalanceMapper accountBalanceMapper;

    @Transactional
    public AccountBalanceDto setLimitMoney(Integer userId, AccountBalanceUpdateDto accountBalanceUpdateDto) {
        Integer workSpaceId = accountBalanceUpdateDto.getWorkSpaceId();
        Integer accountBalanceId = accountBalanceUpdateDto.getId();
        WorkSpace workSpace = workSpaceRepository.findByIdAndUserId(workSpaceId, userId).orElseThrow(() -> new RuntimeException("Space not found in that user"));
        for(AccountBalance accountBalance : workSpace.getAccountsBalances()){
            if(accountBalance.getId().equals(accountBalanceId)){
                accountBalance.setLimitMoney(accountBalanceUpdateDto.getLimitMoney());
                accountBalanceRepository.save(accountBalance);
                return accountBalanceMapper.accountBalanceToAccountBalanceDto(accountBalance);
            }
        }
        throw new AccountException(AccountExceptionEnum.ACCOUNT_NOT_FOUND);
    }

    public AccountBalanceDto getAccountsBalance(Integer userId, Integer workSpaceId, Integer accountBalanceId) {
        WorkSpace workSpace = workSpaceRepository.findByIdAndUserId(workSpaceId, userId).orElseThrow(() -> new SpaceException(SpaceExceptionEnum.SPACE_NOT_FOUND));
        for(AccountBalance accountBalance : workSpace.getAccountsBalances()){
            if(accountBalance.getId() == accountBalanceId){
                return accountBalanceMapper.accountBalanceToAccountBalanceDto(accountBalance);
            }
        }
        throw new AccountException(AccountExceptionEnum.ACCOUNT_NOT_FOUND);
    }

    public List<AccountBalanceDto> listAccountsBalance(Integer userId, Integer workSpaceId) {
        WorkSpace workSpace = workSpaceRepository.findByIdAndUserId(workSpaceId, userId).orElseThrow(() -> new SpaceException(SpaceExceptionEnum.SPACE_NOT_FOUND));
        return workSpace.getAccountsBalances()
            .stream()
            .map(accountBalance -> accountBalanceMapper.accountBalanceToAccountBalanceDto(accountBalance))
            .collect(Collectors.toList())
            ;
    }
    
}
