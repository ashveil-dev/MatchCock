import { http, HttpResponse } from 'msw'
import fetchGameList from "test/apis/fetchGameList";

const GetGame = http.get("/apis/game/list", async ({request}) => {
    const url = new URL(request.url)
    const tournamentId = url.searchParams.get("tournamentId") as string | undefined;

    if (tournamentId === undefined || tournamentId === null || tournamentId === "") {
        return new HttpResponse(null, { status: 401 })
    }

    try {
        const response = await fetchGameList({ tournamentId })
        return HttpResponse.json({
            data : {
                gameList : response
            }
        })
    } catch (e) {
       return new HttpResponse(null, { status: 500 })
    }
})

export {
    GetGame
};