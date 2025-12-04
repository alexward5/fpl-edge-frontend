import { TableConfig } from "../../types/TableColumn";

const tableConfig: TableConfig = {
    columns: [
        {
            id: "rank",
            sticky: true,
            stickyRightBorder: true,
            sx: {
                width: "34px",
                minWidth: "34px",
                textAlign: "center",
                padding: "0px",
            },
            headerConfig: {
                label: "#",
                numeric: true,
                sortable: false,
                sx: {
                    fontSize: "15px",
                    textAlign: "center",
                },
            },
        },
        {
            id: "fplWebName",
            sticky: true,
            stickyRightBorder: true,
            sx: {
                width: "130px",
                minWidth: "130px",
                paddingLeft: "6px",
            },
            headerConfig: {
                label: "Player",
                numeric: false,
                sx: {
                    paddingLeft: "6px",
                },
            },
        },
        {
            id: "fbrefTeam",
            sx: {
                width: "125px",
                minWidth: "125px",
                textAlign: "right",
            },
            headerConfig: {
                label: "Team",
                numeric: true,
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
                sx: {
                    paddingRight: "12px",
                },
            },
        },
    ],
};

export default tableConfig;
