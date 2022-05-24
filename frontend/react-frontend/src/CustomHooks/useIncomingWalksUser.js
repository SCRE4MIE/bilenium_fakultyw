import { useEffect, useState } from 'react';
import instance from '../axios';
import requests from '../requests';

const useIncomingWalksUser = () => {

    const dayjs = require("dayjs");
    const today = dayjs();

    const [walks, setWalks] = useState([]);
    const incomingWalks = walks.filter(e => {
        const startDate = dayjs(e.date);
        return startDate > today;
    })

    useEffect(() => {
        instance.get(requests.getUserWalks)
        .then(response => {
        setWalks(response.data);
        })
    }, [])

    return incomingWalks.sort(function(a,b){return new Date(a.date) - new Date(b.date);});
}

export default useIncomingWalksUser;