import {useContext} from "react";
import {DBContext} from "../components/DBProvider";

// To fix useContext default value

export const useDbContext = () => {
    const dbContext = useContext(DBContext);
    if (!dbContext)
        throw new Error(
            'No DBContext.Provider found when calling useDbContext.'
        );
    return dbContext;
};