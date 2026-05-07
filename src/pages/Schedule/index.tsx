import Header from "@common/Header";
import NavigationBar from "@common/NavigationBar";
import useTournamentStore from "@stores/useTournamentStore";
import { useQuery } from "@tanstack/react-query";
import fetchGameList from "apis/fetchGameList";
import Spinner from "@assets/images/Spinner2.gif"

function planDateToString(planDate: string, type: string[]) {
    const year = planDate.slice(0, 4)
    const month = planDate.slice(4, 6)
    const date = planDate.slice(6, 8)

    return `${year}${type[0]}${month}${type[1]}${date}${type[2]}`
}

function timeToString(time: string) {
    const [hour, min] = time.split(":")

    return `${hour}시 ${min}분`
}

export default function Schedule() {
    const { checked, tournamentId } = useTournamentStore();
    const { isLoading, isFetching, isSuccess, data } = useQuery({
        queryKey: [],
        queryFn: () => fetchGameList({ tournamentId })
    })

    return (
        <div className="w-full flex flex-col min-h-dvh pb-2">
            <Header />
            <main className="w-full h-full grow shrink-0 flex flex-col md:items-center">
                <div id="container" className="w-full max-w-[1700px] min-h-full flex flex-col px-4 grow">
                    <div id="top" className="flex flex-col flex-wrap md:flex-row items-center">
                        <div className="w-full">
                            <div className="w-full flex justify-center md:justify-start mb-4">
                                <NavigationBar current="schedule" />
                            </div>
                            <h1 id="title" className="w-full text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-center md:text-left ">
                                <span className="text-FairyBlue">스케쥴표</span>를 꾸미고 저장하세요!
                            </h1>
                            <div id="tip" className="flex flex-col md:flex-row justify-center md:justify-start items-start md:gap-4 mb-2 md:mb-4 text-center md:text-left">
                                <div className="font-semibold text-black hidden md:block">
                                    <span>Tip</span>
                                </div>
                                <div className="grow w-full flex flex-col gap-1 md:gap-0 font-semibold text-sm md:text-base text-neutral-500 mb-2 md:mb-0">
                                    <p>선택하신 클럽과 팀의 매치업을 스케쥴표로 만들었어요~!</p>
                                    <p>원하시는 색깔로 꾸민 후 사진으로 다운로드할 수 있어요</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="w-full flex justify-between flex-wrap mb-6">
                            <div className="flex gap-3 shrink-0">
                                <button
                                    className={
                                        clsx("flex items-center gap-2 rounded-2xl shadow-2xl p-3 md:px-4 md:py-0 cursor-pointer", "bg-white text-black border border-neutral-100"
                                        )}>
                                    <AiFillAppstore className="w-6 h-full" />
                                    <span>한번에 보기</span>
                                </button>
                                <button
                                    className={clsx("flex items-center gap-2 rounded-2xl shadow-2xl px-4 cursor-pointer",
                                        "bg-white text-black border border-neutral-100"
                                    )}>
                                    <TbInfinity className="w-6 h-full" />
                                    <span>나눠서 보기</span>
                                </button>
                            </div>
                            <div>
                                <button className="w-10 h-10 cursor-pointer rounded-sm text-xm font-medium text-neutral-500 hover:text-black hover:font-bold">
                                    정렬
                                </button>
                                <button className="w-10 h-10 cursor-pointer rounded-sm text-xm font-medium text-neutral-500 hover:text-black hover:font-bold">
                                    필터
                                </button>
                            </div>
                        </div> */}

                    </div>
                    <div id="middle" className="w-full h-full flex flex-col items-center justify-center grow">
                        {
                            (isLoading || isFetching) &&
                            <div className="w-full h-full grow flex items-center justify-center">
                                <img alt="loading" src={Spinner} />
                            </div>
                        }
                        {(!isLoading && !isFetching && isSuccess && data) &&
                            <section id="schedule-table" className="w-full max-w-[800px] shadow-2xl rounded-2xl overflow-hidden">
                                <article className="w-full hidden md:grid md:grid-cols-6 bg-FairyBlue text-white text-center px-4 py-4 font-semibold">
                                    <span>날짜</span>
                                    <span>시간</span>
                                    <span>코트</span>
                                    <span>유형</span>
                                    <span>출전선수 1팀</span>
                                    <span>출전선수 2팀</span>
                                </article>
                                {
                                    data && data.gameList && data.gameList.data_list
                                        .filter(match => checked.includes(`${match.EVENT_ID}-${match.TEAM1_ENTRY_ID}`) || checked.includes(`${match.EVENT_ID}-${match.TEAM2_ENTRY_ID}`))
                                        .map(match =>
                                        (
                                            <>
                                                <article
                                                    className="w-full hidden md:grid md:grid-cols-6 text-center px-4 py-4 odd:bg-FairyBlue/10"
                                                    key={`${match.EVENT_ID}-${match.TEAM1_ENTRY_ID}-${match.TEAM2_ENTRY_ID}`}
                                                >
                                                    <span>{planDateToString(match.PLAN_DATE, ["년 ", "월 ", "일"])}</span>
                                                    <span>{timeToString(match.START_TIME)}</span>
                                                    <span>{match.COURT_NO}번</span>
                                                    <span>{match.EVENT_NM}</span>
                                                    <span>{match.T1_PLAYER}</span>
                                                    <span>{match.T2_PLAYER}</span>
                                                </article>

                                            </>
                                        )
                                        )
                                }
                            </section>
                        }
                        {(!isLoading && !isFetching && isSuccess && data) &&
                            <section id="schedule-table" className="w-full md:hidden">
                                {
                                    data && data.gameList && data.gameList.data_list
                                        .filter(match => checked.includes(`${match.EVENT_ID}-${match.TEAM1_ENTRY_ID}`) || checked.includes(`${match.EVENT_ID}-${match.TEAM2_ENTRY_ID}`))
                                        .map(match =>
                                        (
                                            <article className="w-full flex flex-col md:hidden mb-4 max-w-[300px] mx-auto shadow-xl rounded-lg overflow-hidden border border-gray-100">
                                                <div className="px-4 py-2 font-semibold text-sm flex justify-between">
                                                    <div>Court {match.COURT_NO}</div>
                                                    <div>{planDateToString(match.PLAN_DATE, ["/", "/", ""])} {match.START_TIME}</div>
                                                </div>
                                                <div className="w-full flex flex-wrap justify-between  rounded-bl-2xl rounded-br-2xl overflow-hidden relative">
                                                    <div className="grow flex">
                                                        <div className="w-full flex flex-col items-center justify-center min-h-12 px-2 text-sm font-semibold bg-blue-200/10">
                                                            {match.T1_PLAYER.split("/").map(player => <div>{player}</div>)}
                                                        </div>
                                                        <div className="[writing-mode:vertical-lr] bg-FairyBlue/80 text-white font-bold px-4 py-2">
                                                            Team 1
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col text-black justify-center px-2 items-center font-semibold">
                                                        <span>v</span>
                                                        <span>s</span>
                                                    </div>
                                                    <div className="grow flex">
                                                        <div className="[writing-mode:vertical-lr] rotate-180 bg-BlushPink/80 text-white font-bold px-4 py-2 ">Team 2</div>
                                                        <div className="w-full flex flex-col items-center justify-center min-h-12 px-2 text-sm font-semibold bg-pink-300/10">
                                                            {match.T2_PLAYER.split("/").map(player => <div>{player}</div>)}
                                                        </div>
                                                    </div>

                                                </div>

                                            </article>
                                        )
                                        )
                                }
                            </section>
                        }
                    </div>
                </div >
            </main >
        </div >
    )
}

