import { Box, Divider, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "@/app/store";
import { ResetButton, SaveButton } from "@/common/components/buttons";
import Switcher from "@/common/components/switcher";

const SecurityUI = () => {
  // const dispatch = useAppDispatch();

  const { control, handleSubmit, reset } = useForm({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    defaultValues: {
      pin_code_status: false,
      bar_code_status: false,
    },
  });

  const handleSubmitForm = async (data: any) => {
    console.log(data);
  };
  const handleResetDefault = () => reset();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "680px",
        margin: "0px auto",
      }}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Stack spacing="20px">
          <Controller
            name="pin_code_status"
            control={control}
            render={({ field }) => <Switcher label="Pin Code" {...field} />}
          />
          <Controller
            name="bar_code_status"
            control={control}
            render={({ field }) => <Switcher label="Bar Code" {...field} />}
          />
        <Divider variant="middle" />
        </Stack>
        <Stack gap={4} direction="row" justifyContent="center" marginTop="50px">
          <ResetButton onClick={handleResetDefault} type="button">
            Reset
          </ResetButton>
          <SaveButton type="submit">Save</SaveButton>
        </Stack>
      </form>
    </Box>
  );
};

export default SecurityUI;
