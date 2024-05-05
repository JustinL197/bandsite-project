export const apiKey = "56fed03b-5857-45b0-a658-671fde7d9544";

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
            console.error('There is an error posting comment:', error.message);
        }
    }

    async getComments(){
        try {
            const response = await axios.get(`${this.baseUrl}/comments?api_key=${this.apiKey}`);
            const sortedComments = response.data.sort((a, b) => b.timestamp - a.timestamp);
            return sortedComments;
        }

        catch(error){
            console.error('There is an error fetching comments:', error.message);
        }
    }

    async getShows(){
        try {
            const response = await axios.get(`${this.baseUrl}/showdates?api_key=${this.apiKey}`);
            return response.data 
        }

        catch(error){
            console.error('There is an error fetching show-dates', error.message);
        }
    }

    //diving deeper part
    async likeComment(commentId){
        try {
            const response = await axios.put(`${this.baseUrl}/comments/${commentId}/like?api_key=${this.apiKey}`);
            return response.data;
        }

        catch(error){
            console.error('Error liking comment:', error.message);
        }
    }

    async deleteComment(commentId){
        try {
            const response = await axios.delete(
                `${this.baseUrl}/comments/${commentId}?api_key=${this.apiKey}`
            );
            return response.data;
        } catch (error) {
            console.error('Error deleting comment:', error.message);
            throw error;
        }
    }
}