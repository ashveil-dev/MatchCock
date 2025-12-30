import { FaCompressAlt } from "react-icons/fa";
import type { ITournamentData } from "@type/tournament";
import { useNavigate } from "react-router";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import clsx from "clsx"
import useTournamentStore from "@stores/useTournamentStore";

interface IProps {
    tournament: ITournamentData | undefined,
    exitModal: () => void
}

function DetailTournamentCard({
    tournament,
    exitModal
}: IProps) {
    if (tournament === undefined) return <></>;
    const { setTournamentId } = useTournamentStore()
    const navigate = useNavigate();

    const onSelectButtonClicked = () => {
        if(tournament.TOURNAMENT_ID === null) {
            alert("올바르지 않은 대회 설정입니다.")
        } else {
            setTournamentId(tournament.TOURNAMENT_ID);
            navigate("/MatchCock/Club")
        }
        exitModal();
    }

    return (
        <div id="tournament-card" className="w-full max-h-full flex flex-col shadow-lg">
            <div className={
                clsx(
                    "flex flex-col shrink-0 justify-between gap-4 bg-linear-to-r px-6 py-5 text-white",
                    (tournament.STAT_NM === "신청" || tournament.STAT_NM === "예정") && "from-BlushPink to-fuchsia-600",
                    (tournament.STAT_NM === "접수" || tournament.STAT_NM === "진행") && "from-RoyalAmethyst to-blue-400",
                    (tournament.STAT_NM === "완료" && "from-MysticIndigo to-violet-400")
                )}>
                <div className="flex w-full justify-between items-center">
                    <div className="shrink-0 pr-5">
                        <span className="text-xl font-bold shrink-0">
                            {tournament.STAT_NM}
                        </span>
                    </div>
                    <div className="shrink px-2">
                        <h2 className="text-lg md:text-2xl font-bold hidden md:block">
                            {tournament.TOURNAMENT_NM}
                        </h2>
                    </div>
                    <div className="shrink-0">
                        <button
                            onClick={exitModal}
                            className="rounded-full flex items-center gap-2 bg-white/20 px-3 py-2 text-sm font-medium tracking-wide cursor-pointer">
                            <span className="hidden md:block">창 닫기</span>
                            <span>
                                <FaCompressAlt />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <article className="w-full flex flex-col xl:flex-row bg-gray-100 md:p-4 gap-2">
                {(tournament.POSTER !== null || tournament.POSTER2 !== null)
                    && (
                        <section className="w-full h-full px-8 py-8 xl:w-1/2 bg-white rounded-2xl">
                            <Slider
                                dots
                                infinite
                                speed={500}
                                slidesToShow={1}
                                slidesToScroll={1}
                                className="w-full h-full"
                            >
                                {(tournament.POSTER !== null) &&
                                    <div className="w-full h-full" onDoubleClick={() => {

                                    }}>
                                        <img
                                            alt="포스터"
                                            src={tournament.POSTER ?? undefined}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                }
                                {(tournament.POSTER2 !== null) && <div >
                                    <img
                                        alt="포스터"
                                        src={tournament.POSTER2 ?? undefined}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                }
                            </Slider>

                        </section>
                    )
                }
                <section className="w-full xl:w-1/2 flex flex-col p-6 bg-white rounded-2xl xl:overflow-y-auto shrink-0" style={{ "flexGrow": (tournament.POSTER === null && tournament.POSTER2 === null) ? "1" : "0" }}>
                    <dl className="w-full flex flex-col grow shrink-0">
                        {
                            tournament.TOURNAMENT_NM && (
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-12 sm:gap-6 py-2 grow">
                                    <dt className="sm:col-span-3 flex items-start gap-2 text-sm font-medium text-gray-500 mt-px">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-none" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h10v2H4z" />
                                        </svg>
                                        <span className="shrink-0">대회명</span>
                                    </dt>
                                    <dd className="sm:col-span-9 text-base font-semibold text-gray-900 text-wrap break-keep">
                                        {tournament.TOURNAMENT_NM}
                                    </dd>
                                </div>
                            )
                        }

                        {
                            (tournament.TOUR_DATE || tournament.ACCEPT_DATE_M) && (
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-12 sm:gap-6 py-2 grow">
                                    <dt className="sm:col-span-3 flex items-start gap-2 text-sm font-medium text-gray-500 mt-px">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 flex-none" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v3H2V6a2 2 0 0 1 2-2h3V2zm15 8v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8h20z" />
                                        </svg>
                                        <span className="shrink-0">일시</span>
                                    </dt>
                                    <dd className="sm:col-span-9 text-gray-900">
                                        <p className="font-medium">{tournament.TOUR_DATE}</p>
                                        <p className="text-sm text-gray-500 mt-px">{tournament.ACCEPT_DATE_M}</p>
                                    </dd>
                                </div>
                            )
                        }


                        {
                            tournament.TOUR_LOCATION && (
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-12 sm:gap-6 py-2 grow">
                                    <dt className="sm:col-span-3 flex items-start gap-2 text-sm font-medium text-gray-500 mt-px">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 flex-none" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7zm0 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                                        </svg>
                                        <span className="shrink-0">장소</span>
                                    </dt>
                                    <dd className="sm:col-span-9 text-gray-900">
                                        <div className="space-y-1 font-medium flex flex-col">
                                            <span>{tournament.TOUR_LOCATION}</span>
                                        </div>
                                    </dd>
                                </div>
                            )
                        }

                        {
                            tournament.TOUR_SUPPORT && (
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-12 sm:gap-6 py-2 grow">
                                    <dt className="sm:col-span-3 flex items-start gap-2 text-sm font-medium text-gray-500 mt-px">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 flex-none" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm1-5h-2v2h2V2zM3 11H1v2h2v-2zm20 0h-2v2h2v-2zM12 20h-2v2h2v-2z" />
                                        </svg>
                                        <span className="shrink-0">개회식</span>
                                    </dt>
                                    <dd className="sm:col-span-9 text-gray-900">
                                        <p className="font-medium">{tournament.TOUR_SUPPORT}</p>
                                    </dd>
                                </div>
                            )
                        }
                        {
                            tournament.TOUR_SPONSOR && (
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-12 sm:gap-6 py-2 grow">
                                    <dt className="sm:col-span-3 flex items-start gap-2 text-sm font-medium text-gray-500 mt-px">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 flex-none" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M3 3h18v2H3zM5 7h14v2H5zM7 11h10v2H7zM9 15h6v2H9z" />
                                        </svg>
                                        <span className="shrink-0">주최</span>
                                    </dt>
                                    <dd className="sm:col-span-9 text-gray-900">{tournament.TOUR_SPONSOR}</dd>
                                </div>
                            )
                        }

                        {
                            tournament.TOUR_MANAGER && (
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-12 sm:gap-6 py-2 grow">
                                    <dt className="sm:col-span-3 flex items-start gap-2 text-sm font-medium text-gray-500 mt-px">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 flex-none" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm-9 9a9 9 0 0 1 18 0z" />
                                        </svg>
                                        <span className="shrink-0">담당자</span>
                                    </dt>
                                    <dd className="sm:col-span-9 text-gray-900">{tournament.TOUR_MANAGER}</dd>
                                </div>
                            )
                        }

                        {
                            tournament.TOUR_SUPPORT && (
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-12 sm:gap-6 py-2 grow">
                                    <dt className="sm:col-span-3 flex items-start gap-2 text-sm font-medium text-gray-500 mt-px">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 flex-none" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M4 4h16v6H4zM4 12h7v8H4zM13 12h7v8h-7z" />
                                        </svg>
                                        <span className="shrink-0">후원</span>
                                    </dt>
                                    <dd className="sm:col-span-9 text-gray-900">
                                        <span className="mr-2 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                                            <p className="font-medium">{tournament.TOUR_SUPPORT}</p>
                                        </span>
                                    </dd>
                                </div>
                            )
                        }

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-12 sm:gap-6 py-2 grow">
                            <dt className="sm:col-span-3 flex items-start gap-2 text-sm font-medium text-gray-500 mt-px">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 flex-none" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 5h10v2H7zM5 9h14v2H5zM7 13h10v2H7zM9 17h6v2H9z" />
                                </svg>
                                <span className="shrink-0">종목</span>
                            </dt>
                            <dd className="sm:col-span-9">
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">혼합</span>
                                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">남자</span>
                                    <span className="inline-flex items-center rounded-full bg-pink-50 px-3 py-1 text-sm font-medium text-pink-700">여자</span>
                                </div>
                            </dd>
                        </div>
                    </dl>
                    <div className="flex flex-col gap-3  px-6 py-4 sm:flex-row sm:items-center sm:justify-center grow">
                        <a href={tournament.TM_OUTLINE_FILE_URL ?? undefined} target="_blank" className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white">
                            안내문 보기
                        </a>
                        <button 
                            onClick={onSelectButtonClicked}
                            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
                            대회 선택하기
                        </button>
                    </div>
                </section>
            </article>
        </div >
    )
}

export default DetailTournamentCard;