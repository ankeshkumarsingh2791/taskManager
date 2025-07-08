class ApiTODO{
    constructor(){
        this.baseURL="http://localhost:8080/api/v1/todo";
        this.defaultHeaders = {
            'Content-Type': "application/json",
            "Accept":"application/json"
        }
    }
    async customFetch(endPoint, options = {}){
        try {
            const url = `${this.baseURL}${endPoint}`
            const headers = {...this.defaultHeaders, ...options.headers}
            const config = {
                ...options,
                headers,
                credentials:'include'
            }
            console.log("fetching api todo")
            const response = await fetch(url,config)
            const data = await response.json()
            return data
        } catch (error) {
           console.log('Api Error from fetch', error) 
           throw error
        }

    }

    async createProject(title, description, projectId){
       return this.customFetch(`/create-task?projectId=${projectId}`, {
        method: "POST",
        body: JSON.stringify({title, description}),
        headers:{
            'Content-Type': 'application/json'
        }
       })
    }

    async getProjectById(projectId){
        console.log(projectId, ">>>>>>>>><<<<<<<<>>>>>>>>.......")
        return this.customFetch(`/get-task-ById?projectId=${projectId}`, {
            method: "GET",
            
        })
    }
}


const apiTODO = new ApiTODO();
export default apiTODO
