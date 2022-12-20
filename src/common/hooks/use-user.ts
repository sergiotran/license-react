import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  selectUserFilterData,
  selectUserPaginationData,
  selectUserList,
  selectUserLoading,
  setPaginationData,
  selectUserFilterStatusSearchText,
} from "@/features/users/user-slice";
import React from "react";

export interface UserPaginationData {
  page: number;
  limit: number;
  total: number;
}

const useUser = () => {
  const dispatch = useAppDispatch();
  const filterData = useAppSelector(selectUserFilterData);
  const paginationData = useAppSelector(selectUserPaginationData);
  const userList = useAppSelector(selectUserList);
  const isLoading = useAppSelector(selectUserLoading);
  const searchValue = useAppSelector(selectUserFilterStatusSearchText);

  const updatePaginationData = React.useCallback(
    (data: Partial<UserPaginationData>) => {
      dispatch(setPaginationData(data));
    },
    []
  );

  return {
    filterData,
    paginationData,
    userList,
    isLoading,
    searchValue,
    updatePaginationData,
  };
};

export default useUser;
