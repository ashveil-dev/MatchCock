import { FaAnglesLeft, FaChevronLeft, FaChevronRight, FaAnglesRight } from "react-icons/fa6";
import clsx from "clsx";

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

    return (
        <div className="w-full flex justify-center gap-2">
            <div id="firstPageGroup" className="flex">
                {pageNumber > pageUnit &&
                    <div
                        onClick={pageMove(1)}
                        className="w-5 h-5 p-2 flex items-center justify-center box-content border border-gray-200 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white">
                        <FaAnglesLeft className="w-4" />
                    </div>
                }
            </div>
            <div id="previousPageGroup" className="flex">
                {
                    pageNumber > pageUnit &&
                    <div
                        onClick={pageMove(((Math.floor(pageNumber / (pageUnit + 1)) - 1) * (pageUnit)) + 1)}
                        className="w-5 h-5 p-2 flex items-center justify-center box-content border border-gray-200 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white">
                        <FaChevronLeft className="w-4" />
                    </div>
                }
            </div>
            <div id="pageGroup" className="flex gap-2">
                {
                    [...Array(pageUnit).keys()].map(i =>
                        <button
                            key={i}
                            onClick={pageMove((i + 1) + (Math.floor(pageNumber / (pageUnit + 1)) * pageUnit))}
                            className={
                                clsx(
                                    "w-5 h-5 p-2 font-bold  box-content border border-gray-200 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white",
                                    pageNumber === ((i + 1) + (Math.floor(pageNumber / (pageUnit + 1)) * pageUnit)) ? "bg-black text-white" :" bg-white text-black"
                            )}>
                            {(i + 1) + (Math.floor(pageNumber / (pageUnit + 1)) * pageUnit)}
                        </button>
                    )
                }
            </div>
            <div id="nextPageGroup" className="flex">
                {
                    (Math.floor(pageNumber / pageUnit) < Math.floor(lastPageNumber / pageUnit)) &&
                    <div
                        onClick={pageMove(((Math.floor(pageNumber / (pageUnit + 1)) + 1) * (pageUnit)) + 1)}
                        className="w-5 h-5 p-2 flex items-center justify-center box-content border border-gray-200 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white">
                        <FaChevronRight className="w-4" />
                    </div>
                }
            </div>
            <div id="lastPageGroup" className="flex">
                {
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