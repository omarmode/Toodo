import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { useContext } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Delete, DeleteOutline, EditOutlined } from "@mui/icons-material";
import "../App.css";
import { ToodoContext } from "../contexts/ToodoContext";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
function Toodo({ title, des, isCompeleted, handelcheckedtoodo, id }) {
  const { Toodo1, setToodo } = useContext(ToodoContext);

  function handelchecked() {
    handelcheckedtoodo(id);
    localStorage.setItem("toodos", JSON.stringify(UpdatedToodos));
  }
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
  const [open, setOpen] = React.useState(false);
  const [openUpdat, setopenUpdat] = React.useState(false);
  const [Updata, setUpdata] = useState({ title: title, des: des });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateClose = () => {
    setopenUpdat(false);
  };
  const handelUpdateOpen = () => {
    setopenUpdat(true);
  };
  function handelDeletecomfirm() {
    const DeletToodo = Toodo1.filter((i) => {
      if (i.id == id) {
        return false;
      } else {
        return true;
      }
    });
    setToodo(DeletToodo);
    localStorage.setItem("toodos", JSON.stringify(DeletToodo));
  }
  const handelUpdatecomfirm = () => {
    const Updates = Toodo1.map((i) => {
      if (i.id == id) {
        return { ...i, title: Updata.title, des: Updata.des };
      } else {
        return i;
      }
    });
    setToodo(Updates);
    setopenUpdat(false);
    localStorage.setItem("toodos", JSON.stringify(Updates));
  };

  return (
    <>
      <Dialog
        dir="rtl"
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"هل انت متاكد من حذف المهمه؟"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            في حال تم حذف المهمه سوف تحذف نهائيا ولا يمكن استرجاعها
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>لا</Button>
          <Button onClick={handelDeletecomfirm} color="error">
            نعم
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        dir="rtl"
        open={openUpdat}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleUpdateClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"هل تريد تعديل هذا المهمه ؟"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="عنوان المهمه"
            label="عنوان المهمه"
            type="text"
            fullWidth
            variant="standard"
            value={Updata.title}
            onChange={(e) => {
              setUpdata({ ...Updata, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="تفاصيل المهمه"
            label="تفاصيل المهمه"
            type="text"
            fullWidth
            variant="standard"
            value={Updata.des}
            onChange={(e) => {
              setUpdata({ ...Updata, des: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>لا</Button>
          <Button onClick={handelUpdatecomfirm} color="success">
            تاكيد
          </Button>
        </DialogActions>
      </Dialog>
      <Card
        sx={{
          minWidth: 275,
          bgcolor: "#283593",
          color: "#fff",
          marginTop: "2%",
        }}
        className="Cardtoodo"
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                gutterBottom
                variant="h4"
                style={{
                  textDecoration: isCompeleted ? "line-through" : "none",
                }}
              >
                {title}
              </Typography>
              <Typography gutterBottom variant="p">
                {des}
              </Typography>
            </Grid>
            <Grid size={4} display={"flex"} justifyContent={"space-around"}>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: "10px",
                }}
              >
                <IconButton
                  onClick={() => {
                    handelchecked();
                  }}
                  className="check"
                  size="md"
                  sx={{
                    bgcolor: isCompeleted ? "green" : "white",
                    borderRadius: "50%",
                    border: "solid green 3px",
                  }}
                >
                  <CheckIcon sx={{ color: isCompeleted ? "white" : "green" }} />
                </IconButton>
                <IconButton
                  size="md"
                  sx={{
                    bgcolor: "white",
                    borderRadius: "50%",
                    border: "solid blue 3px",
                  }}
                  onClick={handelUpdateOpen}
                >
                  <EditOutlined sx={{ color: "blue" }} />
                </IconButton>
                <IconButton
                  className="eidt"
                  size="md"
                  sx={{
                    bgcolor: "white",
                    borderRadius: "50%",
                    border: "solid red 3px",
                  }}
                  onClick={handleClickOpen}
                >
                  <DeleteOutline sx={{ color: "red" }} />
                </IconButton>
              </CardActions>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Toodo;
