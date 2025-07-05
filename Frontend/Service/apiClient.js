class ApiClient{
    constructor(){
        this.baseURL = "http://localhost:8080/api/v1/user";
        this.defaultHeaders = {
            'Content-Type': "application/json",
            "Accept": "application/json"
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
        console.log(">>>>>>>>>",name, email, password, username);
        
       return  this.customFetch("/register",{
            method: "POST",
            body: JSON.stringify({name, email, username, password})
        })
    }

     async signin(email, password){
        console.log(" >>>>>>", email, password)
        return this.customFetch("/login",{
            method: "post",
            body: JSON.stringify({email, password})
        })
    }
     async getProfile(){
        return this.customFetch("/users/me")
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