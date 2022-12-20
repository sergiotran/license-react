import {
  selectAccountData,
  selectAccountId,
  selectAccountLoading,
  fetchAccountById,
  fetchAccountsByMerchantId,
  updateAccountInfo,
  setAccountData,
  setAccountId,
} from "@/features/accounts/account-slice";
import { useAppSelector, useAppDispatch } from "@/app/store";
import React from "react";
import { Account } from "@/features/accounts/account-model";

export interface FilterData {
  username: string;
  email: string;
  status: string;
}

export type FetchAccounts = {
  page: number;
  limit: number;
  merchant_id: string;
  filterData: FilterData;
};

const useAccount = () => {
  const dispatch = useAppDispatch();

  const accountId = useAppSelector(selectAccountId);
  const accountDetail = useAppSelector(selectAccountData);
  const isLoading = useAppSelector(selectAccountLoading);

  const fetchAccount = React.useCallback((id: string) => {
    dispatch(fetchAccountById(id));
  }, []);

  const fetchAccounts = React.useCallback((data: FetchAccounts) => {
    dispatch(fetchAccountsByMerchantId(data));
  }, []);

  const updateAccount = React.useCallback((data: Partial<Account>) => {
    return new Promise((resolve, reject) => {
      return dispatch(updateAccountInfo(data))
        .unwrap()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }, []);

  const updateAccountLocalData = React.useCallback((data: Account) => {
    dispatch(setAccountData(data));
  }, []);

  const updateAccountMainId = React.useCallback((id: string) => {
    dispatch(setAccountId(id));
  }, []);

  return {
    accountDetail,
    accountId,
    isLoading,
    fetchAccount,
    fetchAccounts,
    updateAccount,
    updateAccountLocalData,
    updateAccountMainId
  };
};

export default useAccount;
