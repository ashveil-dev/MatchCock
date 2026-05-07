import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import type { CustomTournamentType } from "@type/tournament"

interface IClubCard {
    isFold: boolean,
    club: CustomTournamentType,
    checkedList : string[],
    setCheckedList : (func: (_checked: string[]) => string[]) => void,
    onFold: () => void,
}

export default function ClubCard({
    club,
    isFold,
    checkedList,
    setCheckedList,
    onFold,
}: IClubCard) {
    const ref = useRef<HTMLDivElement>(null)
    const [isSelectAll, setIsSelectAll] = useState(false);

    const onSelectTeam = useCallback((entryId: string | null) => () => {
        if (entryId === null) return;

        if (checkedList.includes(entryId)) {
            setCheckedList(_checked => _checked.filter(c => c !== entryId));
        } else {
            setCheckedList(_checked => ([..._checked, entryId]))
        }
    }, [checkedList])

    const onSelectAllButtonClicked = () => {
        if (club.teams === undefined) return;
        if (isSelectAll) {
            setCheckedList(_checkedList => _checkedList.filter(entry => !club.teams?.map(team => team.ENTRY_ID).includes(entry)))
        } else {
            const newCheckedList = new Set(checkedList);
            club.teams.forEach(team => team.ENTRY_ID !== null && newCheckedList.add(team.ENTRY_ID))
            setCheckedList(_checkedList => [...newCheckedList])
        }
    
        setIsSelectAll(flag => !flag)
    }

    useEffect(() => {
        if (club.teams?.every(team => team.ENTRY_ID != null && checkedList.includes(team.ENTRY_ID))) {
            setIsSelectAll(true);
        } else {
            setIsSelectAll(false)
        }
    }, [club])

    return (
        <div
            onClick={onFold}
            className={clsx("max-w-dvw overflow-hidden border border-neutral-200 rounded-2xl px-4 shadow-sm hover:shadow-md transition-all ease-in duration-200",
                !isFold ? "py-4" : "pt-4 pb-0"
            )}>
            <div className="flex flex-col md:flex-row justify-between items-center cursor-pointer mb-4">
                <div id="left">
                    <h2 className="text-xl font-bold">{club.name}</h2>
                </div>
                <div id="right" className="w-80 flex justify-center md:justify-between">
                    <div className="flex grid-cols-3 gap-2 mt-3 md:mt-0">
                        <span className="bg-RoyalAmethyst col-span-1 text-white rounded-2xl text-sm md:text-base px-3 py-1">Total : {club.teams?.length ?? 0}</span>
                        <span className="bg-FairyBlue  col-span-1 text-white rounded-2xl text-sm md:text-base px-3 py-1">Select : {club.teams?.reduce((acc, cur) => acc + (cur.checked ? 1 : 0), 0)}</span>
                        <span className="bg-BlushPink col-span-1 text-white rounded-2xl text-sm md:text-base px-3 py-1">UnSelect : {club.teams?.reduce((acc, cur) => acc + (cur.checked ? 0 : 1), 0)}</span>
                    </div>
                </div>
            </div>
            <div
                ref={ref}
                style={{
                    height: !isFold ? ref.current?.scrollHeight : 0,
                    borderWidth: !isFold ? 1 : 0,
                    transition: "height 0.3s ease"
                }}
                onClick={(e) => e.stopPropagation()}
                className={"flex flex-col rounded-xl ease-in-out duration-300 overflow-hidden border border-neutral-200"}
            >
                <div className="grid grid-cols-4 md:grid-cols-5 p-3 text-center font-semibold border-b-gray-200 bg-RoyalAmethyst/80 text-white">
                    <span className="" >
                        <input className="cussor-pointer" type="checkbox" onClick={onSelectAllButtonClicked} checked={isSelectAll} />
                    </span>
                    <span >
                        나이
                    </span>
                    <span >
                        등급
                    </span>
                    <span className="hidden md:flex">
                        복식 유형
                    </span>
                    <span>
                        출전 선수
                    </span>
                </div>
                {club.teams && club.teams.map(team => team.ENTRY_ID !== null && (
                    <div
                        key={team.ENTRY_ID}
                        onClick={onSelectTeam(team.ENTRY_ID)}
                        className={clsx("grid grid-cols-4 md:grid-cols-5 p-3 cursor-pointer text-center ",
                            checkedList.includes(team.ENTRY_ID) ? "bg-black/70 text-white" : "bg-white text-black"
                        )}
                    >
                        <span>
                            <input className="cusor-pointer" type="checkbox" checked={checkedList.includes(team.ENTRY_ID)} />
                        </span>
                        <span>
                            {team.AGE}대
                        </span>
                        <span>
                            {team.GRADE}조
                        </span>
                        <span className="hidden md:flex">
                            {team.GENDER === "A" ? "혼복" :
                                team.GENDER === "M" ? "남복" : "여복"
                            }
                        </span>
                        <span>
                            {team.PLAYER_NM1} & {team.PLAYER_NM2}
                        </span>
                    </div>
                ))}
            </div>
        </div >
    )
}