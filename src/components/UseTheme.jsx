import { useTheme } from "@mui/material";
import React from "react";

const SetTheme = ({setTheme}) => {
    const theme = useTheme();

    React.useEffect(() => {
        setTheme(theme);
        return () => null;
    }, []);

    return null;
};

export default SetTheme;