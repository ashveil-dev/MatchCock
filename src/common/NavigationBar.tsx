import clsx from "clsx";
import { Link } from "react-router";

interface INavigationBar {
    current: "tournament" | "club" | "schedule"
}
function NavigationBar({
    current
}: INavigationBar) {
    return (
        <div className="flex items-center">
            <Link to="/MatchCock/Tournament" className={clsx(
                " mr-2 cursor-pointer block",
                current === "tournament" ? "bg-BlushPink text-white px-2 py-1 rounded-2xl font-bold" : "font-normal"
            )}>대회</Link>
            <span className="mr-2">/</span>
            <Link to="/MatchCock/Club" className={clsx(
                " mr-2 cursor-pointer block",
                current === "club" ? "bg-FairyBlue text-white px-2 py-1 rounded-2xl font-medium" : "font-normal"
            )}>클럽</Link>
            <span className="mr-2">/</span>
            <Link to="/MatchCock/Schedule" className={clsx(
                "cursor-pointer block",
                current === "schedule" ? "bg-RoyalAmethyst text-white px-2 py-1 rounded-2xl font-medium" : "font-normal"
            )}>스케쥴표</Link>
        </div>
    )
}

export default NavigationBar;