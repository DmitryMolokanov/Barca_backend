const express = require("express");
const axios = require("axios");
const getSeason = require("./utils/getSeason");

app = express();

const host = "5.35.88.50";
const port = 7000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  next();
});
app.use(express.json());

app.get("/standings", (req, res) => {
  try {
    async function getStandings() {
      const response = await axios.get(
        "https://api.football-data.org/v4/competitions/2014/standings",
        {
          headers: {
            "X-Auth-Token": "93b7086b41b44367a298740e0e629e09",
          },
        }
      );
      res.send(response.data);
    }
    getStandings();
  } catch (err) {
    console.log(err);
  }
});

app.get("/last_matches", (req, res) => {
  try {
    async function getCloseMatches() {
      const closeFinished = await axios.get(
        "https://api.football-data.org/v4/teams/81/matches?status=FINISHED&limit=3",
        {
          headers: {
            "X-Auth-Token": "93b7086b41b44367a298740e0e629e09",
          },
        }
      );
      const closeSchedled = await axios.get(
        "https://api.football-data.org/v4/teams/81/matches?status=SCHEDULED&limit=2",
        {
          headers: {
            "X-Auth-Token": "93b7086b41b44367a298740e0e629e09",
          },
        }
      );
      const result1 = closeFinished.data.matches;
      const result2 = closeSchedled.data.matches;
      res.send(result1.concat(result2));
    }
    getCloseMatches();
  } catch (err) {
    console.log(err);
  }
});

app.get("/season_results", (req, res) => {
  const season = getSeason();
  const url = `https://api.football-data.org/v4/teams/81/matches?status=FINISHED&season=${season}`;
  try {
    async function getSeasonResults() {
      const response = await axios.get(url, {
        headers: {
          "X-Auth-Token": "93b7086b41b44367a298740e0e629e09",
        },
      });
      res.send(response.data.matches);
    }
    getSeasonResults();
  } catch (err) {
    console.log(err);
  }
});

app.get("/season_schedual", (req, res) => {
  try {
    async function getSchedule() {
      const schedule = await axios.get(
        "https://api.football-data.org/v4/teams/81/matches?status=SCHEDULED",
        {
          headers: {
            "X-Auth-Token": "93b7086b41b44367a298740e0e629e09",
          },
        }
      );
      res.send(schedule.data.matches);
    }
    getSchedule();
  } catch (err) {
    console.log(err);
  }
});

app.get("/squad", (req, res) => {
  try {
    async function getSquad() {
      const squad = await axios.get(
        "http://api.football-data.org/v4/teams/81",
        {
          headers: {
            "X-Auth-Token": "93b7086b41b44367a298740e0e629e09",
          },
        }
      );
      res.send(squad.data);
    }
    getSquad();
  } catch (err) {
    console.log(err);
  }
});

app.get("/score", (req, res) => {
  try {
    async function getLigaScore() {
      const ligaScore = await axios.get(
        "http://api.football-data.org/v4/competitions/PD/scorers",
        {
          headers: {
            "X-Auth-Token": "93b7086b41b44367a298740e0e629e09",
          },
        }
      );
      res.send(ligaScore.data.scorers);
    }
    getLigaScore();
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
);
