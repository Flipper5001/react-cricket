
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";


const Team = () => {
    const { loading, data , refetch} = useQuery(QUERY_ME);

    console.log(data);

    return (
        `${data.me.team.name}`

    )
}


export default Team;