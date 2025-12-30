import axios from "axios";
import fetchTournament from "./fetchTournament";
import fetchTournamentList from "./fetchTournamentList";

const ax = axios.create({
    baseURL: "/apis",
})

export {
    fetchTournament,
    fetchTournamentList
};

export default ax;