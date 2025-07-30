import React, { createContext, useState, useContext } from "react";

type LoadingContextType = {
    incrementLoading: () => void;
    decrementLoading: () => void;
    isLoading: boolean;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [loadingCount, setLoadingCount] = useState(0);

    const incrementLoading = () => setLoadingCount((count) => count + 1);
    const decrementLoading = () => setLoadingCount((count) => count - 1);

    return (
        <LoadingContext.Provider
            value={{
                incrementLoading,
                decrementLoading,
                isLoading: loadingCount > 0,
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};
