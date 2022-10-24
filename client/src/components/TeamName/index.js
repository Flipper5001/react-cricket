
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";


const Team = () => {
    const { loading, data , refetch} = useQuery(QUERY_ME);

    console.log(data);

    if(!data?.me) {
        refetch();
    }

    return (
        `${data.me.team.teamName}`

    )
}


export default Team;