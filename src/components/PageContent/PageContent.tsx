import { useState } from "react";
import Header from "./Header/Header";
import PlayerData from "../PlayerData/PlayerData";

function PageContent() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    return (
        <>
            <Header handleDrawerToggle={handleDrawerToggle} />
            <PlayerData
                handleDrawerClose={handleDrawerClose}
                handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                mobileOpen={mobileOpen}
            />
        </>
    );
}

export default PageContent;
