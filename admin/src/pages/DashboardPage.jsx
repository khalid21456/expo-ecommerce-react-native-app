import {useQuery} from "@tanstack/react-query"
import { orderApi } from "../lib/api";

export default function Dashboard() {

    const {data, isLoading} = useQuery({
        queryKey:["orders"],
        queryFn: orderApi.getAll,     
    })

    console.log("isLoading : ",isLoading)
    console.log("orders : ",data)
    return (
       <div>Dashboard Page</div> 
    );
}