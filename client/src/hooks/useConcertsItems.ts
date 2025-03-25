'use client'

import { useEffect } from "react";

export function useConcertsItems() {
    // const items = useAppSelector(state => state.concertsItems.items);    //TODO: получать с сервера
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     !items.length && dispatch(getConcertsItems());
    //   }, [items, dispatch]);

    const isLoading = false;
    const items = [
        {
            date: '2024-04-04',
            city: 'Санкт-Петербург',
        },
        {
            date: '2024-04-06',
            city: 'Москва',
        },
        {
            date: '2024-04-11',
            city: 'Ростов-на-Дону',
        },
        {
            date: '2024-04-12',
            city: 'Воронеж',
        },
    ]

    return { items, isLoading }
}