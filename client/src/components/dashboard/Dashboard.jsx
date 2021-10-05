import React, { useEffect, useState } from "react";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { red } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import "flag-icon-css/css/flag-icon.min.css";
import { Chart } from "react-google-charts";

import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACK_SERVER_URL } from "../../config/config";
import { getDateTime } from "../../utils";

import "./dashboard.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 650,
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

const CustomCard = ({ child }) => {
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      style={{
        height: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {child}
    </Card>
  );
};

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [problemDifficulties, setProblemDifficulties] = useState([]);
  const [tags, setTags] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const parseJwt = (token) => {
      if (token == null) return null;
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    };

    const accessToken = localStorage.getItem("access-token");
    const userId = parseJwt(accessToken).sub;

    axios
      .get(`${BACK_SERVER_URL}/api/user/userId/${userId}`, { headers: {"Authorization" : `Bearer ${accessToken}`} })
      .then((res) => {
        setUser(res.data);

        if(res.data !== null) {
          const userTags = res.data.stats.tags;
          let tags_ = [["Tag", "Count"]];
          
          Object.keys(userTags).forEach((curTag) => {
            tags_.push([curTag, userTags[curTag]]);
          });

          setTags(tags_);
        }
      })
      .catch((err) => {
        const error = err.response ? err.response.data.message : err.message;
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, []);

  useEffect(() => {
    if (user.stats) {
      let _submissions = [["Field", "Count"]],
        _problemDifficulties = [["Field", "Count"]];

      let _hasData = false;
      
      Object.keys(user.stats.verdicts).forEach((keyName) => {
        _hasData |= user.stats.verdicts[keyName] !== 0;
          _submissions.push([
            keyName,
            user.stats.verdicts[keyName],
          ]);
      });
      
      Object.keys(user.stats.difficulties).forEach((keyName) => {
        _hasData |= user.stats.difficulties[keyName] !== 0;
          _problemDifficulties.push([
            keyName.charAt(0).toUpperCase() + keyName.toLowerCase().slice(1),
            user.stats.difficulties[keyName],
          ]);
      });

      setSubmissions(_submissions);
      setProblemDifficulties(_problemDifficulties);
      setHasData(_hasData);
      setLoader(false);
    }
  }, [user]);

  return (
    <div className="dashboard-container">
      <ToastContainer />
      <div className="dashboard-spinner">
        <BeatLoader color={"#343a40"} size={30} loading={loader} />
      </div>
      <div className="dashboard-left">
        <div className="dashboard-top">
          <img
            src="https://images.unsplash.com/photo-1513789181297-6f2ec112c0bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFja2VyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="dashboard-image"
          />
          <div className="dashboard-top-title">
            <span className="dashboard-username">
              {user.firstName + " " + user.lastName}
            </span>
            <span className="dashboard-user-title">Competitive Programmer</span>
          </div>
        </div>
        <div className="dashboard-bottom">
          <span className="dashboard-content-title">Account Details</span>
          <div className="dashboard-info">
            <PermIdentity className="dashboard-icon" />
            <span className="dashboard-info-title">{user.description}</span>
          </div>
          <div className="dashboard-info">
            <CalendarToday className="dashboard-icon" />
            <span className="dashboard-info-title">
              Registered: {getDateTime(user.date)}
            </span>
          </div>
          <span className="dashboard-content-title">Contact Details</span>
          <div className="dashboard-info">
            <PhoneAndroid className="dashboard-icon" />
            <span className="dashboard-info-title">
              {formatPhoneNumberIntl(user.contact)}
            </span>
          </div>
          <div className="dashboard-info">
            <MailOutline className="dashboard-icon" />
            <span className="dashboard-info-title">{user.email}</span>
          </div>
          <div className="dashboard-info">
            <LocationSearching className="dashboard-icon" />
            <span className="dashboard-info-title">
              {user.country ? (
                <span
                  className={`flag-icon flag-icon-${user.country.toLowerCase()}`}
                  style={{ marginRight: "10px" }}
                />
              ) : null}
              {user.country}
            </span>
          </div>
        </div>
      </div>
      <div className="dashboard-right">
        <div className="dashboard-top-right">
          {hasData ? (
            <Chart
              width={"900px"}
              height={"550px"}
              chartType="PieChart"
              loader={
                <CustomCard child={<CircularProgress color="secondary" />} />
              }
              data={tags}
              options={{
                title: "Tags of " + user.firstName + " " + user.lastName,
                pieHole: 0,
                titleTextStyle: {
                  fontSize: 20,
                },
              }}
              rootProps={{ "data-testid": "3" }}
            />
          ) : (
            <div className="dashboard-chart-no-data">
              <p className="dashboard-chart-no-data-title">
                You have not submitted anything yet.
              </p>
            </div>
          )}
        </div>
        <div className="dashboard-bottom-right">
          <Chart
            width={"500px"}
            height={"300px"}
            chartType="PieChart"
            loader={
              <CustomCard child={<CircularProgress color="secondary" />} />
            }
            data={submissions}
            options={{
              title: "Verdicts of " + user.firstName + " " + user.lastName,
              is3D: true,
              titleTextStyle: {
                fontSize: 20,
              },
            }}
            rootProps={{ "data-testid": "2" }}
          />
          <Chart
            width={"500px"}
            height={"300px"}
            chartType="PieChart"
            loader={
              <CustomCard child={<CircularProgress color="secondary" />} />
            }
            data={problemDifficulties}
            options={{
              title: "Levels of " + user.firstName + " " + user.lastName,
              is3D: true,
              titleTextStyle: {
                fontSize: 20,
              },
            }}
            rootProps={{ "data-testid": "2" }}
          />
        </div>
        <br /> <br />
      </div>
    </div>
  );
};

export default Dashboard;
