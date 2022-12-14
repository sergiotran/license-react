import React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";

type Props = {
  title: string;
}

const Background = styled(Grid)({
  position: "relative",
});

const OverlayImage = styled("img")({
  width: "100%",
  height: "100vh",
  objectFit: "cover",
  display: "block",
});

const Logo = styled("img")({
  width: 'auto',
  height: 'auto',
  display: 'block',
  maxWidth: '100%',
  marginBottom: '10%',
});

const Heading = styled("h2")(({ theme }) => {
  return {
    textTransform: 'none',
    fontSize: '25px',
    color: theme.palette.primary.main,
    fontWeight: 600,
    lineHeight: '1.1',
  }
})

const AuthLayout: React.FC<Props & React.PropsWithChildren> = ({ title, children }) => {
  return (
    <Grid container spacing={0}>
      <Background item display={{
        xs: 'none',
        md: 'block'
      }} md={6} lg={8}>
        <OverlayImage src="/imgs/login-img_resized.jpg" alt="Login Image" />
      </Background>
      <Grid
        item
        lg={4}
        md={6}
        xs={12}
        display="flex"
        alignItems="center"
        textAlign='center'
        paddingTop={{
          xs: 5,
          md: 0,
        }}
      >
        <Stack width='100%' justifyContent='center' alignItems='center'>
          <Logo src="/imgs/new_logo_resized.png" alt="logo" />
          <Heading>{title}</Heading>
          {children}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
