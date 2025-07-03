import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { v4 as uuidv4 } from "uuid";
import {
  alertClasses,
  alertTitleClasses,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Toodo from "./Toodo";
import AddToodo from "./AddToodo";
import { ToodoContext } from "../contexts/ToodoContext";

function Toodolist() {
  const { Toodo1, setToodo } = React.useContext(ToodoContext);
  // const [Toodo1, setToodo] = React.useState(InfitToodo);
  const [alignment, setAlignment] = React.useState("web");
  const [titleInput, settitleInput] = React.useState("");
  const [desinput, setdesinput] = React.useState("");
  const [NavButtoms, setNavButtoms] = React.useState("all");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const NavTypes = (e) => {
    setNavButtoms(e.target.value);
  };
  function handelcheckedtoodo(id) {
    const update = Toodo1.map((i) => {
      if (i.id == id) {
        i.isCompeleted = !i.isCompeleted;
      }
      return i;
    });
    setToodo(update);
    localStorage.setItem("toodos", JSON.stringify(update));
  }
  const completedToodos = (Toodo1 || []).filter((i) => i.isCompeleted);
  const nonCompletedToodos = Toodo1.filter((i) => {
    return !i.isCompeleted;
  });
  let ToodosClicked = Toodo1;
  if (NavButtoms === "completed") {
    ToodosClicked = completedToodos;
  } else if (NavButtoms === "non-completed") {
    ToodosClicked = nonCompletedToodos;
  } else {
    ToodosClicked = Toodo1;
  }
  function handelclicked() {
    const newToodo = {
      id: uuidv4(),
      title: titleInput,
      des: desinput,
      isCompeleted: false,
    };
    const UpdatedToodos = [...Toodo1, newToodo];
    setToodo(UpdatedToodos);
    // localStorage.setItem("toodos", JSON.stringify(UpdatedToodos));
    settitleInput("");
    setdesinput("");
  }
  const Toodolist = ToodosClicked.map((i) => {
    return (
      <Toodo
        id={i.id}
        handelcheckedtoodo={handelcheckedtoodo}
        title={i.title}
        des={i.des}
        key={i.id}
        isCompeleted={i.isCompeleted}
      />
    );
  });
  React.useEffect(() => {
    const storage = localStorage.getItem("toodos");
    if (storage) {
      const parsed = JSON.parse(storage);
      if (Array.isArray(parsed)) {
        setToodo(parsed);
      }
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "80vh", overflow: "scroll" }}
      >
        <CardContent>
          <Typography
            gutterBottom
            sx={{
              color: "text.secondary",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            variant="h1"
          >
            مهامي
          </Typography>
          <Divider />
          <ToggleButtonGroup
            color="primary"
            value={NavButtoms}
            exclusive
            onChange={NavTypes}
            aria-label="Platform"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              direction: "ltr",
              marginTop: "3%",
            }}
          >
            <ToggleButton value="non-completed">غير المنجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
        </CardContent>
        {Toodolist}
        <Box>
          <CardContent>
            <Grid container>
              <Grid size={8}>
                <Input
                  fullWidth
                  placeholder="اضافه عنوان "
                  value={titleInput}
                  onChange={(e) => {
                    settitleInput(e.target.value);
                  }}
                ></Input>
                <Input
                  fullWidth
                  placeholder="اضافه وصف "
                  value={desinput}
                  onChange={(e) => {
                    setdesinput(e.target.value);
                  }}
                ></Input>
              </Grid>
              <Grid size={4} display={"flex"} justifyContent={"end"}>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "red", color: "white", height: "100%" }}
                  onClick={handelclicked}
                  disabled={titleInput.length <= 0}
                >
                  اضافه مهمه{" "}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default Toodolist;
