import { TableConfig } from "../../types/TableColumn";

const tableConfig: TableConfig = {
    columns: [
        {
            id: "fplWebName",
            sticky: true,
            stickyRightBorder: true,
            sx: {
                width: "125px",
                minWidth: "125px",
                paddingLeft: "12px",
            },
            headerConfig: {
                label: "Player",
                numeric: false,
                sx: {
                    paddingLeft: "12px",
                },
            },
        },
        {
            id: "fbrefTeam",
            sticky: true,
            stickyRightBorder: true,
            sx: {
                width: "125px",
                minWidth: "125px",
                textAlign: "right",
                paddingRight: "12px",
            },
            headerConfig: {
                label: "Team",
                numeric: true,
                disablePadding: false,
                sx: {
                    paddingRight: "12px",
                },
            },
        },
        {
            id: "fplPlayerPosition",
            sx: {
                width: "90px",
                minWidth: "90px",
                textAlign: "right",
            },
            headerConfig: {
                label: "Position",
                numeric: true,
                disablePadding: false,
            },
        },
        {
            id: "fplPlayerCost",
            sx: {
                width: "80px",
                minWidth: "80px",
                textAlign: "right",
            },
            headerConfig: {
                label: "Price",
                numeric: true,
                disablePadding: false,
            },
        },
        {
            id: "sumPoints",
            sx: {
                width: "80px",
                minWidth: "80px",
                textAlign: "right",
            },
            headerConfig: {
                label: "Points",
                numeric: true,
                disablePadding: false,
            },
        },
        {
            id: "gamesPlayed",
            sx: {
                width: "80px",
                minWidth: "80px",
                textAlign: "right",
            },
            headerConfig: {
                label: "Games",
                numeric: true,
                disablePadding: false,
            },
        },
        {
            id: "sumMinutes",
            sx: {
                width: "90px",
                minWidth: "90px",
                textAlign: "right",
            },
            headerConfig: {
                label: "Minutes",
                numeric: true,
                disablePadding: false,
            },
        },
        {
            id: "sumGoals",
            sx: {
                width: "80px",
                minWidth: "80px",
                textAlign: "right",
            },
            headerConfig: {
                label: "Goals",
                numeric: true,
                disablePadding: false,
            },
        },
        {
            id: "sumAssists",
            sx: {
                width: "85px",
                minWidth: "85px",
                textAlign: "right",
            },
            headerConfig: {
                label: "Assists",
                numeric: true,
                disablePadding: false,
            },
        },
        {
            id: "sumNPxG",
            sx: {
                width: "80px",
                minWidth: "80px",
                textAlign: "right",
            },
            headerConfig: {
                label: "NPxG",
                numeric: true,
                disablePadding: false,
            },
        },
        {
            id: "sumxA",
            sx: {
                width: "80px",
                minWidth: "80px",
                textAlign: "right",
            },
            headerConfig: {
                label: "xA",
                numeric: true,
                disablePadding: false,
            },
        },
        {
            id: "sumNPxP",
            sx: {
                width: "92px",
                minWidth: "92px",
                textAlign: "right",
            },
            headerConfig: {
                label: "NPxGAP",
                numeric: true,
                disablePadding: false,
            },
        },
        {
            id: "sumDefensiveContributions",
            sx: {
                width: "80px",
                minWidth: "80px",
                textAlign: "right",
            },
            headerConfig: {
                label: "DC",
                numeric: true,
                disablePadding: false,
            },
        },
        {
            id: "sumBPS",
            sx: {
                width: "80px",
                minWidth: "80px",
                textAlign: "right",
            },
            headerConfig: {
                label: "BPS",
                numeric: true,
                disablePadding: false,
            },
        },
        {
            id: "fplSelectedByPercent",
            sx: {
                width: "120px",
                minWidth: "120px",
                textAlign: "right",
                paddingRight: "12px",
            },
            headerConfig: {
                label: "Selected %",
                numeric: true,
                disablePadding: false,
                sx: {
                    paddingRight: "12px",
                },
            },
        },
    ],
};

export default tableConfig;

