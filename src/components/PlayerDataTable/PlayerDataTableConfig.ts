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
                width: "138px",
                minWidth: "138px",
                paddingLeft: "8px",
            },
            headerConfig: {
                label: "Player",
                numeric: false,
                sx: {
                    paddingLeft: "8px",
                },
            },
        },
        {
            id: "fplTeamName",
            sx: {
                width: "110px",
                minWidth: "110px",
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
                width: "78px",
                minWidth: "78px",
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
                width: "78px",
                minWidth: "78px",
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
                width: "82px",
                minWidth: "82px",
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
                width: "78px",
                minWidth: "78px",
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
                width: "82px",
                minWidth: "82px",
                textAlign: "right",
            },
            headerConfig: {
                label: "Assists",
                numeric: true,
            },
        },
        {
            id: "sumxG",
            sx: {
                width: "78px",
                minWidth: "78px",
                textAlign: "right",
            },
            headerConfig: {
                label: "xG",
                numeric: true,
            },
        },
        {
            id: "sumxA",
            sx: {
                width: "78px",
                minWidth: "78px",
                textAlign: "right",
            },
            headerConfig: {
                label: "xA",
                numeric: true,
            },
        },
        {
            id: "sumxGI",
            sx: {
                width: "78px",
                minWidth: "78px",
                textAlign: "right",
            },
            headerConfig: {
                label: "xGI",
                numeric: true,
            },
        },
        {
            id: "sumxGAP",
            sx: {
                width: "88px",
                minWidth: "88px",
                textAlign: "right",
            },
            headerConfig: {
                label: "xGAP",
                numeric: true,
            },
        },
        {
            id: "sumShotsOnTarget",
            sx: {
                width: "78px",
                minWidth: "78px",
                textAlign: "right",
            },
            headerConfig: {
                label: "SoT",
                numeric: true,
            },
        },
        {
            id: "sumBigChancesCreated",
            sx: {
                width: "78px",
                minWidth: "78px",
                textAlign: "right",
            },
            headerConfig: {
                label: "BCC",
                numeric: true,
            },
        },
        {
            id: "sumKeyPasses",
            sx: {
                width: "78px",
                minWidth: "78px",
                textAlign: "right",
            },
            headerConfig: {
                label: "KP",
                numeric: true,
            },
        },
        {
            id: "sumDefensiveContributions",
            sx: {
                width: "78px",
                minWidth: "78px",
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
                width: "78px",
                minWidth: "78px",
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
