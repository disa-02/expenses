export const ApiPaths = {
    auth: {
        signup: '/auth/sign-up',
        login: '/auth/log-in'
    },
    account: {
        base: (id) => `/account/${id}`,
        delete: (id,accountId) => `/account/${id}/${accountId}`,
        get: (id,accountId) => `/account/${id}/${accountId}`,
        update: (id) => `/account/${id}`
    },
    space: {
        list: (id) => `/workSpace/list?userId=${id}`,
        delete: (id,itemId) => `/workSpace/${id}/${itemId}`,
        add: (id) => `/workSpace/${id}`,
        get: (id, spaceId) => `/workSpace?userId=${id}&&spaceId=${spaceId}`,
        update: (id) => `/workSpace/${id}`
    },
    accountOperation: {
        list: (id, accountId) => `/account/operation/${id}/${accountId}`,
        add: (id) => `/account/operation/moneyTransaction/${id}`,
        delete: (id, accountId, operationId) => `/account/operation/deleteOperation/${id}/${accountId}/${operationId}`,
        transfer: (id) => `/account/operation/transfer/${id}`,
        findExpenseByMonth: (id,year) => `/account/operation/findExpenseByMonth/${id}?year=${year}`
    },
    spaceOperation: {
        list: (id, accountId) => `/workSpace/operation/${id}/${accountId}`,
        add: (id, spaceId) => `/workSpace/operation/${id}/${spaceId}`,
        delete: (id, accountId, operationId) => `/workSpace/operation/${id}/${accountId}/${operationId}`
    },
    accountBalance:{
        list: (id, spaceId) => `/accountBalance/list?userId=${id}&&workSpaceId=${spaceId}`,
        setLimit: (id) => `/accountBalance/${id}`
    },
    saving: {
        list: (id) => `/savingSpace/list?userId=${id}`,
        delete: (id,itemId) => `/savingSpace/${id}/${itemId}`,
        add: (id) => `/savingSpace/${id}`,
        get: (id, spaceId) => `/savingSpace?userId=${id}&&spaceId=${spaceId}`,
        update: (id) => `/savingSpace/${id}`
    },
    savingOperation: {
        list: (id, accountId) => `/savingSpace/operation/${id}/${accountId}`,
        add: (id, spaceId) => `/savingSpace/operation/${id}/${spaceId}`,
        delete: (id, accountId, operationId) => `/savingSpace/operation/${id}/${accountId}/${operationId}`
    }

}