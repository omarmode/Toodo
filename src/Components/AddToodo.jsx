import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Input,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Delete, DeleteOutline, EditOutlined } from "@mui/icons-material";
import "../App.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
function AddToodo() {
  return (
    <Box>
      <CardContent>
        <Grid container>
          <Grid size={8}>
            <Input fullWidth placeholder="اضافه عنوان "></Input>
          </Grid>
          <Grid size={4} display={"flex"} justifyContent={"end"}>
            <Button
              variant="contained"
              sx={{ bgcolor: "red", color: "white", height: "100%" }}
            >
              اضافه مهمه{" "}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Box>
  );
}

export default AddToodo;
