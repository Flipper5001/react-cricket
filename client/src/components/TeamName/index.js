
import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";


const Team = async () => {

    const { loading, data } =  useQuery(QUERY_ME);

    console.log(data);

    // if(!data?.me) {
    //     console.log('no data')
    //     return ('Your Team')

    // }

    return (
        `${data.me.team.teamName}`
    )
}


export default Team;