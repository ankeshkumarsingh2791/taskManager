class ApiClient{
    constructor(){
        this.baseURL = "https://taskmanager-3-87gw.onrender.com/api/v1/user";
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

    async signup(name, email, username,password){
        
       return  this.customFetch("/register",{
            method: "POST",
            body: JSON.stringify({name, email, username, password})
        })
    }

     async signin(email, password){
        return this.customFetch("/login",{
            method: "post",
            body: JSON.stringify({email, password})
        })
    }
     async getProfile(){
        return this.customFetch("/users/me")
    }

     async verifyMail(token){
        return this.customFetch(`/verify/${token}`)
    }

    async whoAm(){
        return this.customFetch('/who-am-i',{
            method:'get'
        })
    }

    async logOut(){
        return this.customFetch('/logout', {
            method:'POST'
        })
    }
}

const apiClient = new ApiClient();
export default apiClient