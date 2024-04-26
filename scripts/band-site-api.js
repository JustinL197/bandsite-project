export const apiKey = "ad81a429-015f-474a-8491-b5c5fe2db636";

export class BandSiteApi{
    constructor(apiKey){
        this.apiKey = apiKey;
        this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com';
    }

    async postComment(comment){
        try {
            const response = await axios.post(`${this.baseUrl}/comments?api_key=${this.apiKey}`,
            comment, {headers: {'Content-Type': 'application/json'}});
    
            return response.data;
        }
        
        catch(error){
            console.log('There is an error posting comment:', error.message);
            //throw error --> ask question regarding this.
        }
    }

    async getComments(){
        try{
            const response = await axios.get(`${this.baseUrl}/comments?api_key=${this.apiKey}`)
            const sortedComments = response.data.sort((a, b) => b.timestamp - a.timestamp);
            return sortedComments;
        }

        catch(error){
            console.log('There is an error fetching comments:', error.message);
            //throw error --> ask question regarding this.
        }
    }

    async getShows(){
        try{
            const response = await axios.get(`${this.baseUrl}/showdates?api_key=${this.apiKey}`)
            return response.data 
        }

        catch(error){
            console.log('There is an error fetching show-dates', error.message);
            //throw error --> ask quetsion regarding this
        }
    }
}