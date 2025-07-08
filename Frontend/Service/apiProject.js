class ApiProject{
    constructor(){
        this.baseURL = "http://localhost:8080/api/v1/project";
        this.defaultHeaders = {
            'Content-Type': "application/json",
            "Accept": "application/json",
             "token":localStorage.getItem("token") ?? ""
        }
    }

    async customFetch(endPoint, options = {}){
        try {
           const url = `${this.baseURL}${endPoint}` 
           const headers = {...this.defaultHeaders, ...options.headers}
           const config = {
            ...options,
            headers,
            credentials: 'include'

           }
           console.log('fetch url')
          const response =  await fetch(url, config)
          const data = await response.json()
          return data
        } catch (error) {
           console.log('API Error', error) 
           throw error
        }
    }

    async createProject(name, description,userId){
        
        
       return  this.customFetch(`/create-project?userId=${userId}`,{
            method: "POST",
            body: JSON.stringify({name, description,}),
            headers:{
                'Content-Type': 'application/json'
            }
            
        })
    }

     async getAllProject(userId){
       
        return this.customFetch(`/all-project?userId=${userId}`,{
            method: "GET",
            params: userId
            
        })
    }
     async getProjectById(projectId){
       
        return this.customFetch(`/project-id?projectId=${projectId}`,{
            method: "GET"
        })
    }

    async whoAm(){
        return this.customFetch('/who-am-i',{
            method:'get'
        })
    }


}

const apiProject = new ApiProject();
export default apiProject