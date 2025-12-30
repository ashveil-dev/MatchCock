/*
* 1. 최상위 폴더 alias 설정하기 (미진행)
* 2. header 디자인 수정하기
* 
*/

import LogoImage from "@assets/images/Logo.svg"
import { Link } from "react-router";

function Header() {
    return (
        <header className="sticky w-full h-20 p-5">
            <Link to="/MatchCock" className="w-8 h-8 block">
                <img
                    alt="로고"
                    src={LogoImage}
                    className="w-full h-full"
                />
            </Link>
        </header>
    )
}

export default Header;