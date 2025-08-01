import React, { createContext, useContext } from "react";
import type { GetDataQuery } from "../__generated__/graphql";

const DataContext = createContext<GetDataQuery | undefined>(undefined);

export const DataProvider: React.FC<{
    value: GetDataQuery;
    children: React.ReactNode;
}> = ({ value, children }) => (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
);

export const useData = () => {
    const context = useContext(DataContext);

    if (!context) throw new Error("useData must be used within a DataProvider");

    return context;
};
