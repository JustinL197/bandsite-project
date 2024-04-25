class BandSiteApi{
    constructor(apiKey){
        this.apiKey = apiKey;
        this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com/';
    }

    async postComment(comment){
        const response = await axios.post(`${this.baseUrl}/comments?api_key=${this.apiKey}`,
        comment, {headers: {'Content-Type': 'application/json'}});

        return response.data;
    }
}