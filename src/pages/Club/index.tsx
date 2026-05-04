import Header from "@common/Header";
import NavigationBar from "@common/NavigationBar";
import { useQuery } from "@tanstack/react-query";
import { fetchTournament } from "@apis";
import { AiFillAppstore } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { TbInfinity } from "react-icons/tb";
import useTournamentStore from "@stores/useTournamentStore";
import ClubCard from "@components/Card/ClubCard";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { CustomTournamentType } from "@type/tournament";
import AlignPanel, { type AlignOptionType } from "@components/Panel/Club/Align";
import FilterPanel from "@components/Panel/Club/Filter";
import type { FilterOptionType } from "@components/Panel/Club/Filter"
import clsx from "clsx";
import { useNavigate } from "react-router";
import { GoMoveToTop, GoMoveToBottom } from "react-icons/go";

export default function Club() {
    const navigate = useNavigate();
    const [] = useState<string[]>([]);
    const { tournamentId, checked, setChecked } = useTournamentStore();
    const [alignOption, setAlignOption] = useState<AlignOptionType>({
        name: "",
        total: "",
    })
    const [filterOption, setFilterOption] = useState<FilterOptionType>({
        selected: false,
        unSelected: false,
        age: [],
        group: [],
        matchName: []
    });
    const [foldAll, setFoldAll] = useState(true);
    const [expandAll, setExPandAll] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [isAlignPanelOpen, setIsAlignPanelOpen] = useState(false);
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const [tournament, setTournament] = useState<CustomTournamentType[]>([]);
    const { isLoading, isFetching, data } = useQuery({
        queryKey: ["clubList", tournamentId],
        queryFn: () => fetchTournament({ tournamentId })
    })

    const onScrollingTopButton = () => {
        window.scrollTo(0, 0);
    }

    const onScrollingBottomButton = () => {
        window.scrollTo(0, document.body.scrollHeight)
    }

    const onMakeScheduleButtonClick = () => {
        navigate("/MatchCock/Schedule")
    }

    const onSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputTag = e.currentTarget.firstChild as HTMLInputElement
        const text = inputTag.value

        setSearchText(text)
        inputTag.value = ""
    }

    const isFiltering = useMemo(
        () => filterOption.selected || filterOption.unSelected || filterOption.age.length !== 0 || filterOption.group.length !== 0 || filterOption.matchName.length !== 0,
        [filterOption.selected, filterOption.unSelected, filterOption.age, filterOption.group, filterOption.matchName]
    )

    const isSorting = useMemo(() => alignOption.name !== "" || alignOption.total !== "", [alignOption.name, alignOption.total])

    const filterAndAlignTournament = useMemo(() =>
        tournament
            .flatMap(
                club => {
                    const filteredTeams = club.teams?.filter(team => {
                        if (filterOption.selected && !team.checked) return false;
                        if (filterOption.unSelected && !!team.checked) return false;
                        if (filterOption.age.length > 0 && !filterOption.age.some(_age => (team.AGE && team.AGE?.indexOf(_age.toString()) >= 0))) return false;
                        if (filterOption.group.length > 0 && team.GRADE && !filterOption.group.includes(team.GRADE)) return false;
                        if (filterOption.matchName.length > 0 && team.GENDER && !filterOption.matchName.includes(team.GENDER)) return false;
                        if (searchText !== "" && (team.PLAYER_NM1?.search(searchText) === -1 && team.PLAYER_NM2?.search(searchText) === -1)) return false;

                        return true;
                    })

                    if (filteredTeams && filteredTeams.length > 0)
                        return ({
                            name: club.name,
                            isFold: club.isFold,
                            teams: filteredTeams
                        })

                    return []
                })
            .sort((a, b) => {
                if (alignOption.name !== "") {
                    return (alignOption.name === "asc" ? 1 : -1) * a.name.localeCompare(b.name)
                }

                if (alignOption.total !== "") {
                    return (alignOption.total === "asc" ? 1 : -1) * (a.teams.length - b.teams.length)
                }

                return 0;
            })
        , [data, tournament, searchText, isFiltering, isSorting,
            filterOption.selected, filterOption.unSelected, filterOption.age, filterOption.group, filterOption.matchName,
            alignOption.name, alignOption.total
        ]
    )

    useEffect(() => {
        if (tournamentId === null) {
            alert("대회가 선택되지 않았습니다.")
            navigate("/MatchCock/Tournament")
        }
    }, [tournamentId])

    useEffect(() => {
        if (isLoading || isFetching || data === undefined || data.data === undefined || data.data?.tournament === undefined) {
            return undefined;
        }

        

        setTournament(data?.data?.tournament.map(club => ({
            name: club[0].CLUB_NM1 ? club[0].CLUB_NM1 : "noname",
            isFold: true,
            teams: club,
        })))
    }, [data, data?.data, setTournament, isLoading, isFetching])

    
    const onFold = (name: string) => () => {
        setFoldAll(false);
        setExPandAll(false)
        setTournament(_tournament =>
            _tournament.map(club => ({
                name: club.name,
                isFold: club.name === name ? !club.isFold : !!club.isFold,
                teams: club.teams
            }))
        )
    }

    const onFoldAllButtonClicked = () => {
        setFoldAll(f => !f);
        setExPandAll(false);
        setTournament(_tournament =>
            _tournament.map(club => ({
                name: club.name,
                isFold: true,
                teams: club.teams
            }))
        )
    }

    const onExpandAllButtonClicked = () => {
        setExPandAll(e => !e)
        setFoldAll(false)
        setTournament(_tournament =>
            _tournament.map(club => ({
                name: club.name,
                isFold: false,
                teams: club.teams
            }))
        )
    }

    return (
        <div className="w-full flex flex-col min-h-dvh pb-2">
            <Header />
            <div className="fixed bottom-10 right-5 w-15 flex flex-col gap-4">
                <div className="w-15 h-15 bg-white drop-shadow-black shadow-lg rounded-2xl cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 transition-transform hover:bg-black">
                    <GoMoveToTop onClick={onScrollingTopButton} className="w-full h-full p-4 hover:text-white" />
                </div>
                <div className="w-15 h-15 bg-white drop-shadow-black shadow-lg rounded-2xl cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 transition-transform hover:bg-black">
                    <GoMoveToBottom onClick={onScrollingBottomButton} className="w-full h-full p-4 hover:text-white" />
                </div>
                <div className="w-15 h-15 bg-white drop-shadow-black shadow-lg rounded-2xl opacity-80 hover:opacity-100 hover:scale-105 transition-transform hover:bg-RoyalAmethyst">
                    <button onClick={onMakeScheduleButtonClick} className="w-full h-full text-sm font-bold hover:text-white cursor-pointer">
                        Make
                    </button>
                </div>
            </div>
            <main className="w-full h-full grow shrink-0 flex flex-col md:items-center">
                <div id="container" className="w-full max-w-[1700px] min-h-full flex flex-col px-4 grow">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="w-full">
                            <div className="w-full flex justify-center md:justify-start mb-4">
                                <NavigationBar current="club" />
                            </div>
                            <h1 id="title" className="w-full text-3xl md:text-4xl  font-bold mb-4 text-center md:text-left">
                                원하는 <span className="text-FairyBlue">클럽</span>을 선택해주세요
                            </h1>
                            <div id="tip" className="flex flex-col md:flex-row justify-center md:justify-start items-start md:gap-4 mb-2 md:mb-4 text-center md:text-left">
                                <div className="font-semibold text-black hidden md:block">
                                    <span>Tip</span>
                                </div>
                                <div className="grow w-full font-semibold text-sx text-neutral-500">
                                    <p>대회에 출전한 클럽목록을 보고, 원하는 클럽을 선택해보세요</p>
                                    <p>클럽명을 검색하여 더 빠르게 찾을 수도 있습니다!</p>
                                </div>
                            </div>
                            <div className="w-full flex flex-wrap justify-center md:justify-between mb-6">
                                <div className="flex gap-3 justify-end shrink-0">
                                    <button
                                        onClick={onFoldAllButtonClicked}
                                        className={clsx("flex items-center gap-2 rounded-2xl shadow-2xl p-3 md:px-4 md:py-0 cursor-pointer",
                                            foldAll ? "bg-black text-white border border-white" : "bg-white text-black border border-neutral-100"
                                        )}>
                                        <AiFillAppstore className="w-6 h-full" />
                                        <span>모두 접기</span>
                                    </button>
                                    <button
                                        onClick={onExpandAllButtonClicked}
                                        className={clsx("flex items-center gap-2 rounded-2xl shadow-2xl px-4 cursor-pointer",
                                            expandAll ? "bg-black text-white border border-white" : "bg-white text-black border border-neutral-100"
                                        )}>
                                        <TbInfinity className="w-6 h-full" />
                                        <span>모두 펼치기</span>
                                    </button>
                                </div>

                                <div id="option" className="flex mt-4 md:mt-0 justify-center items-center gap-3 mb-2 md:mb-0 relative shrink-0">
                                    <div className="flex items-center">
                                        <div className="flex shrink-0">
                                            <button
                                                onClick={() => setIsAlignPanelOpen(!isAlignPanelOpen)}
                                                className="w-10 h-10 cursor-pointer rounded-sm text-xm font-medium text-neutral-500 hover:text-black hover:font-bold">
                                                정렬
                                            </button>
                                            <button
                                                onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                                                className="w-10 h-10 cursor-pointer rounded-sm text-xm font-medium text-neutral-500 hover:text-black hover:font-bold">
                                                필터
                                            </button>
                                        </div>

                                        <div className="relative shrink-0">
                                            <form onSubmit={onSearch}>
                                                <input name="searchText" type="text" placeholder="이름을 입력해주세요"
                                                    maxLength={6}
                                                    className="w-50 px-2 pr-7 py-2 border-b border-b-gray-300 outline-none font-semibold"
                                                />
                                                <button type="submit"
                                                    className="absolute right-0 bottom-0 -translate-y-1/2 cursor-pointer"
                                                >
                                                    <IoSearch className="w-6 h-6" />
                                                </button>
                                            </form>
                                        </div>
                                        <AlignPanel setAlignOption={setAlignOption}
                                            isOpen={isAlignPanelOpen} onClose={() => setIsAlignPanelOpen(false)} />
                                        <FilterPanel filterOption={filterOption} setFilterOption={setFilterOption}
                                            isOpen={isFilterPanelOpen} onClose={() => setIsFilterPanelOpen(false)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="clubList" className="flex flex-col gap-4 mb-8">
                        {
                            filterAndAlignTournament.map(club => (
                                <ClubCard club={club} checkedList={checked} setCheckedList={setChecked} isFold={!!club.isFold} onFold={onFold(club.name)} />
                            ))
                        }

                    </div>
                </div>
            </main >
        </div >
    )
}