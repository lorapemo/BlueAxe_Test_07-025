import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { setIsScreenSmall } from "../controller/screenSlice";

export const useScreenWidth = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkScreenSize = () => {
            dispatch(setIsScreenSmall(window.innerWidth < 800));
        };
        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, [dispatch])
};