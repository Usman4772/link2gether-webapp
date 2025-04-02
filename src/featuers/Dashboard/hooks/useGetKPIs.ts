import { useQuery } from "@tanstack/react-query"
import { getKPIMetricsAPI } from "../api/api"
import { handleAPIErrors } from "@/utils/frontend/handleErrors"

function useGetKPIs() {
    const {data,isLoading} = useQuery({
    queryKey:["kpi_metrics"],
    queryFn: getKPIMetrics,
    })
    

  async  function getKPIMetrics() { 
        try {
            const response=await getKPIMetricsAPI()
            if(response?.data?.success){
                return response.data.data
            }
        } catch (error) {
            handleAPIErrors(error)
        }
    }


    return {
       data,
     isLoading
    }
}

export default useGetKPIs