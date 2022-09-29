import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import * as spotActions from '../../../store/spots'

function Listings() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions?.loadAllUserSpots());
    }, [dispatch]);

    let userSpots = useSelector((state) => state?.spots?.spot)

    return ( <div>test</div> )
}

export default Listings