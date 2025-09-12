import { Helmet } from "react-helmet-async";
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
            <Helmet>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="VersoStat" />
                <meta property="og:url" content="https://versostat.com/" />
                <meta
                    property="og:description"
                    content="Fantasy Premier League data table containing xG, xA, xGI, defensive contributions, and more."
                />
            </Helmet>
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
