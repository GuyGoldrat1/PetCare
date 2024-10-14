import * as React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

export default function TwoSidedLayout({
  children,
  reversed,
}: React.PropsWithChildren<{ reversed?: boolean }>) {
  const theme = useTheme();

  return (
    <Container
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 10,
        gap: { xs: 4, md: 6, lg: 12 },
        flexDirection: reversed ? "column-reverse" : "column",
        [theme.breakpoints.up("sm")]: {
          flexDirection: reversed ? "row-reverse" : "row",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", sm: "flex-start" },
          gap: "1rem",
          maxWidth: "50ch",
          textAlign: { xs: "center", sm: "left" },
          flexShrink: 999,
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          minWidth: 300,
          flexGrow: 1,
          maxHeight: 520,
          flexBasis: "50%",
          [theme.breakpoints.up("sm")]: {
            height: "auto",
            maxHeight: "520px",
            flexGrow: 1,
          },
        }}
      >
        <CardMedia
          component="img"
          image="https://images.unsplash.com/photo-1483791424735-e9ad0209eea2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt="Sample Image"
          sx={{
            borderRadius: theme.shape.borderRadius,
            bgcolor: theme.palette.background.default,
          }}
        />
      </Box>
    </Container>
  );
}
