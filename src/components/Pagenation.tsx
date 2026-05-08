import { useCallback, useMemo } from "react";
import clsx from "clsx";
import { FaAnglesLeft, FaChevronLeft, FaChevronRight, FaAnglesRight } from "react-icons/fa6";

interface IPagenation {
    pageUnit?: number,
    pageNumber: number,
    lastPageNumber?: number | null | undefined,
    pageMove: (page: number) => () => void,
}
export default function Pagenation({
    pageUnit = 5,
    pageNumber,
    lastPageNumber,
    pageMove
}: IPagenation) {
    if (!lastPageNumber) {
        return null
    }

    const prevPageMove = useCallback(pageMove(Math.floor((pageNumber - 1) / pageUnit) * pageUnit), [pageNumber, pageUnit, pageMove])
    const nextPageMove = useCallback(pageMove(Math.ceil((pageNumber - 1) / pageUnit) * pageUnit + 1), [pageNumber, pageUnit, pageMove])
    const hasPrevPage = useMemo(() => pageNumber > pageUnit, [pageNumber, pageUnit])
    const hasNextPage = useMemo(() => Math.floor((pageNumber - 1) / pageUnit) < Math.floor((lastPageNumber - 1) / pageUnit), [pageNumber, pageUnit, lastPageNumber])
    const currentPageRange = useMemo(() => [...Array(Math.floor((lastPageNumber - 1) / pageUnit) === Math.floor((pageNumber - 1) / pageUnit) ? ((lastPageNumber - 1) % pageUnit) + 1 : pageUnit).keys()]
        .map(i => Math.floor((pageNumber - 1) / pageUnit) * pageUnit + i + 1),
        [pageNumber, lastPageNumber, pageUnit]
    )

    return (
        <div className="w-full flex justify-center gap-2">
            <div id="firstPageGroup" className="flex">
                {
                    hasPrevPage &&
                    <div
                        onClick={pageMove(1)}
                        className="w-5 h-5 p-2 flex items-center justify-center box-content border border-gray-200 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white">
                        <FaAnglesLeft className="w-4" />
                    </div>
                }
            </div>
            <div id="previousPageGroup" className="flex">
                {
                    hasPrevPage &&
                    <div
                        onClick={prevPageMove}
                        className="w-5 h-5 p-2 flex items-center justify-center box-content border border-gray-200 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white">
                        <FaChevronLeft className="w-4" />
                    </div>
                }
            </div>
            <div id="pageGroup" className="flex gap-2">
                {
                    currentPageRange.map(i =>
                        <button
                            key={i}
                            onClick={pageMove(i)}
                            className={clsx(
                                "min-w-5 min-h-5 p-2 font-bold  box-content border border-gray-200 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white",
                                pageNumber === i ? "bg-black text-white" : " bg-white text-black"
                            )}>
                                {i}
                        </button>
                    )
                }
            </div>
            <div id="nextPageGroup" className="flex">
                {
                    hasNextPage &&
                    <div
                        onClick={nextPageMove}
                        className="w-5 h-5 p-2 flex items-center justify-center box-content border border-gray-200 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white">
                        <FaChevronRight className="w-4" />
                    </div>
                }
            </div>
            <div id="lastPageGroup" className="flex">
                {
                    hasNextPage &&
                    <div
                        onClick={pageMove(lastPageNumber)}
                        className="w-5 h-5 p-2 flex items-center justify-center box-content border border-gray-200 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white">
                        <FaAnglesRight className="w-4" />
                    </div>
                }
            </div>
        </div>
    )
}