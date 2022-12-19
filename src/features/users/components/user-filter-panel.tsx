import {
  Stack,
  Box,
  Button,
  styled,
  Typography,
  InputProps,
  IconButton,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import React from "react";
import { SecondaryInput } from "@/common/components/inputs";
import SelectWithSearch from "@/common/components/select-with-search";
import { useAppDispatch } from "@/app/store";
import {
  setFilterData,
  setStatusSearchText,
  FilterData,
} from "../user-slice";
import { Controller, useForm } from "react-hook-form";

const ApplyButton = styled(Button)(({ theme }) => ({
  color: "rgba(255,255,255,.7)",
  fontWeight: 600,
  fontSize: "13px",
  minWidth: "min-content",
  padding: "10px 30px",
  border: "1px solid #26847d",
  "&:hover": {
    color: theme.palette.common.white,
    backgroundColor: "#26847d",
  },
}));

const UserFilterPanel = () => {
  const dispatch = useAppDispatch();
  const [isResetable, setIsResetable] = React.useState<boolean>(false);

  const { handleSubmit, watch, control, reset } = useForm<FilterData>({
    defaultValues: {
      username: "",
      email: "",
      status: "",
    },
  });
  const watchAllFields = watch(["email", "username", "status"]);

  const handleChangeStatusSearchText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setStatusSearchText(e.target.value));
  };

  const handleSubmitForm = (e: FilterData) => {
    dispatch(
      setFilterData({
        status: e.status,
        email: e.email,
        username: e.username,
      })
    );
  };

  const statusSelectItems = React.useMemo(
    () => [
      {
        value: "",
        label: "Please select...",
      },
      {
        value: "active",
        label: "Active",
      },
      {
        value: "deactive",
        label: "Deactive",
      },
    ],
    []
  );

  React.useEffect(() => {
    setIsResetable(watchAllFields.join("").length > 0);
  }, [watchAllFields]);

  return (
    <Stack
      component="form"
      direction="row"
      sx={{
        backgroundColor: "primary.main",
        borderRadius: "3px",
        padding: "15px",
      }}
      justifyContent="space-between"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Stack
        direction="row"
        spacing="15px"
        alignItems="center"
        flex={1}
        paddingRight={1}
      >
        <FilterIconBox />
        <Typography
          fontWeight="600"
          fontSize="14px"
          textTransform="uppercase"
          color="common.white"
        >
          USER FILTER:
        </Typography>
        {isResetable && (
          <IconButton
            onClick={() => reset()}
            sx={{ marginLeft: " auto!important" }}
          >
            <CancelOutlinedIcon />
          </IconButton>
        )}
      </Stack>
      <Stack direction="row" spacing="15px" alignItems="center">
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <FilterInputText {...field} placeholder="Username" />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FilterInputText {...field} placeholder="Email" />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => {
            console.log(field.onBlur);
            return (
              <SelectWithSearch
                value={field.value}
                onChange={field.onChange}
                data={statusSelectItems}
                searchOnChange={handleChangeStatusSearchText}
              />
            );
          }}
        />
        <ApplyButton type="submit">Apply</ApplyButton>
      </Stack>
    </Stack>
  );
};

const FilterInputText: React.FC<InputProps> = React.forwardRef(function _(
  props,
  ref
) {
  return (
    <SecondaryInput
      ref={ref}
      sx={{
        backgroundColor: "#fff",
      }}
      {...props}
    />
  );
});

const FilterIconBox: React.FC = () => (
  <Box
    sx={{
      padding: "8.5px 11px",
      minWidth: "min-content",
      borderRadius: "5px",
      background: "#3b4556",
      color: "#fff",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <FilterAltIcon />
  </Box>
);

export default UserFilterPanel;
