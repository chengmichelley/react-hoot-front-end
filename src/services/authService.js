const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`

export const signup = async (formData) => {
    try {
        console.log(BASE_URL)
        const response = await fetch(`${BASE_URL}/sign-up`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
                // later we will needs a token here for authenticated request
                // 'Authentication': Bearer <Token>
            },
            body: JSON.stringify(formData)
        })

        const data = await response.json()

        if(data.err){
            throw new Error(data.err)
        }

        if(data.token){
            localStorage.setItem('token', data.token)
            // Return the decoded payload from the token aka username and _id
            console.log(JSON.parse(atob(data.token.split('.')[1])))
            return JSON.parse(atob(data.token.split('.')[1])).user
        }

        
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const signin = async (formData) => {
    try {
        console.log(BASE_URL)
        const response = await fetch(`${BASE_URL}/sign-in`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
                // later we will needs a token here for authenticated request
                // 'Authentication': Bearer <Token>
            },
            body: JSON.stringify(formData)
        })

        const data = await response.json()

        if(data.err){
            throw new Error(data.err)
        }

        if(data.token){
            localStorage.setItem('token', data.token)
            // Return the decoded payload from the token aka username and _id
            return JSON.parse(atob(data.token.split('.')[1])).user
        }

        
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}