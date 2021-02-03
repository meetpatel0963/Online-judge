import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import EmailIcon from "@material-ui/icons/Email";
import { Chart } from "react-google-charts";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./dashboard.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    border: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [submissionData, setSubmissionData] = useState([]);
  const [difficultyData, setDifficultyData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [dataFlag, setDataFlag] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const parseJwt = (token) => {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    };

    const userId = parseJwt(localStorage.getItem("x-auth-token"))._id;

    axios
      .get(`http://localhost:5000/home/user/${userId}`)
      .then((res) => {
        if (mounted) {
          setUser(res.data);
          axios
            .get(`http://localhost:5000/home/submission/${userId}`)
            .then((tags) => {
              let tagsDataTemp = [["Tag", "Count"]];
              Object.keys(tags.data).map((curTag) => {
                tagsDataTemp.push([curTag, tags.data[curTag]]);
              });

              setTagsData(tagsDataTemp);
            })
            .catch((err) => {
              toast.error(err.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (user.stats) {
      let submissionDataTemp = [["Field", "Count"]],
        difficultyDataTemp = [["Field", "Count"]];

      let dataFlagTemp = false;

      Object.keys(user.stats).map((keyName) => {
        dataFlagTemp |= user.stats[keyName] !== 0;
        if (keyName === "easy" || keyName === "medium" || keyName === "hard") {
          difficultyDataTemp.push([
            keyName.charAt(0).toUpperCase() + keyName.toLowerCase().slice(1),
            user.stats[keyName],
          ]);
        } else {
          const newKeyName = keyName.split("Count")[0];
          submissionDataTemp.push([
            newKeyName.toUpperCase(),
            user.stats[keyName],
          ]);
        }
      });

      setSubmissionData(submissionDataTemp);
      setDifficultyData(difficultyDataTemp);
      setDataFlag(dataFlagTemp);
    }
  }, [user]);

  return (
    <div className="dashboard">
      <ToastContainer />
      <div className="profile">
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {user.firstName ? user.firstName[0] : ""}
              </Avatar>
            }
            title={user.firstName ? user.firstName + " " + user.lastName : ""}
            subheader={user.date ? new Date(user.date).toDateString() : ""}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {user.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label="add to favorites"
              className={classes.button}
              disableRipple
            >
              <EmailIcon />
              &nbsp;
              <Typography variant="body2" color="textSecondary" component="p">
                {user.email ? user.email : ""}
              </Typography>
            </IconButton>
          </CardActions>
        </Card>
      </div>
      {dataFlag ? (
        <div className="chart">
          <div className="chart1">
            <Card className={classes.root}>
              <Chart
                width={"500px"}
                height={"300px"}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={submissionData}
                options={{
                  title: "Verdicts of " + user.firstName + " " + user.lastName,
                  // Just add this option
                  is3D: true,
                  titleTextStyle: {
                    fontSize: 16,
                    fontName: "cursive",
                  },
                }}
                rootProps={{ "data-testid": "2" }}
              />
            </Card>
          </div>
          <div className="chart2">
            <Card className={classes.root}>
              <Chart
                width={"500px"}
                height={"300px"}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={difficultyData}
                options={{
                  title: "Levels of " + user.firstName + " " + user.lastName,
                  // Just add this option
                  is3D: true,
                  titleTextStyle: {
                    fontSize: 16,
                    fontName: "cursive",
                  },
                }}
                rootProps={{ "data-testid": "2" }}
              />
            </Card>
          </div>
          <div className="chart3">
            <Card
              className={classes.root}
              style={{ padding: 20 + "px", marginBottom: 20 + "px" }}
            >
              <Chart
                width={"500px"}
                height={"300px"}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={tagsData}
                options={{
                  title: "Tags of " + user.firstName + " " + user.lastName,
                  // Just add this option
                  pieHole: 0.5,
                  titleTextStyle: {
                    fontSize: 16,
                    fontName: "cursive",
                  },
                }}
                rootProps={{ "data-testid": "3" }}
              />
            </Card>
          </div>
        </div>
      ) : (
        <div className="noname">
          <Card
            className={classes.root}
            style={{
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h5> You have not submitted anything yet!! </h5>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
