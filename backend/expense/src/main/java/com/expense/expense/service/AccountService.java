package com.expense.expense.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expense.expense.dto.AccountDto;
import com.expense.expense.dto.AccountSaveDto;
import com.expense.expense.dto.AccountUpdateDto;
import com.expense.expense.entity.Account;
import com.expense.expense.entity.AccountBalance;
import com.expense.expense.entity.UserEntity;
import com.expense.expense.entity.operations.InTransferOperation;
import com.expense.expense.entity.operations.OutTransferOperation;
import com.expense.expense.exception.AccountException;
import com.expense.expense.exception.AccountExceptionEnum;
import com.expense.expense.exception.UserException;
import com.expense.expense.exception.UserExceptionEnum;
import com.expense.expense.mapper.AccountMapper;
import com.expense.expense.mapper.OperationMapper;
import com.expense.expense.repository.AccountRepository;
import com.expense.expense.repository.OperationRepository;
import com.expense.expense.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class AccountService {
    
    @Autowired
    UserRepository userRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    AccountMapper accountMapper;

    @Autowired
    OperationMapper operationMapper;

    @Autowired
    OperationRepository operationRepository;

    @Transactional
    public AccountDto addAccount(Integer id, AccountSaveDto accountSaveDto){
        UserEntity user = userRepository.findById(id).orElseThrow(() -> new UserException(UserExceptionEnum.USER_NOT_FOUND));
        Account account = accountMapper.accountSaveDtoToAccount(accountSaveDto);
        account.setUser(user);
        user.addAccount(account);
        user.getSpaces()
            .stream()
            .forEach( space -> {
                AccountBalance accountBalance = new AccountBalance();
                accountBalance.setAccount(account);
                accountBalance.setSpace(space);
                space.getAccountsBalances().add(accountBalance);
            })
            ;
        Account saveAccount = accountRepository.save(account);
        return accountMapper.accountToAccountDto(saveAccount);
    }

    @Transactional
    public void delAccount(Integer userId, Integer accountId){
        Account account = accountRepository.findByIdAndUserId(accountId, userId).orElseThrow(() -> new AccountException(AccountExceptionEnum.ACCOUNT_NOT_FOUND));
        UserEntity user = account.getUser();

        account.getOperations().stream().map((operation) ->{
            if(operation instanceof InTransferOperation){
                if(((InTransferOperation)operation).getTransferOperation() != null){
                    ((InTransferOperation)operation).getTransferOperation().setTransferOperation(null);
                    operation = operationRepository.save(operation);
                }
                ((InTransferOperation)operation).setTransferOperation(null);
                operation = operationRepository.save(operation);
            }
            if(operation instanceof OutTransferOperation){
                if(((OutTransferOperation)operation).getTransferOperation() != null){
                    ((OutTransferOperation)operation).getTransferOperation().setTransferOperation(null);
                    operation = operationRepository.save(operation);   
                }

                ((OutTransferOperation)operation).setTransferOperation(null);
                operation = operationRepository.save(operation);
            }
            return operation;
        }).collect(Collectors.toList());;
        user.delAccount(account);
        userRepository.save(user);
    }

    public AccountDto getAccount(Integer userId, Integer accountId){
        Account account = accountRepository.findByIdAndUserId(accountId,userId).orElseThrow(() -> new AccountException(AccountExceptionEnum.ACCOUNT_NOT_FOUND));
        return accountMapper.accountToAccountDto(account);
    }

    public List<AccountDto> getAccounts(Integer userId){
        UserEntity user = userRepository.findById(userId).orElseThrow(() -> new UserException(UserExceptionEnum.USER_NOT_FOUND));
        return user.getAccounts()
            .stream()
            .map(account -> accountMapper.accountToAccountDto(account))
            .collect(Collectors.toList())
            ;
    }

    @Transactional
    public AccountDto updateAccount(Integer userId, AccountUpdateDto accountUpdateDto) {
        Integer accountId = accountUpdateDto.getId();
        Account account = accountRepository.findByIdAndUserId(accountId, userId).orElseThrow(() -> new AccountException(AccountExceptionEnum.ACCOUNT_NOT_FOUND));
        if(accountUpdateDto.getName() != ""){
            account.setName(accountUpdateDto.getName());
        }
        if(accountUpdateDto.getDescription() != ""){
            account.setDescription(accountUpdateDto.getDescription());
        }
        accountRepository.save(account);
        return accountMapper.accountToAccountDto(account);
    }

}
