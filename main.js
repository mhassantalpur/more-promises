const axios = require("axios");
const BASE_URL = "http://localhost:5000";
const constellationsUrl = `${BASE_URL}/constellations`;

const bootes = {
    name: "Orion12",
    meaning: "Archer",
    starsWithPlanets:7,
    quadrant: "NQ1",
};
//Async/await solution
async function getConstellationNameById(id) {
    const url = `${BASE_URL}/constellations/`;
    try {
        const { data } = await axios.get(url); 
        let foundConst = data.find(({name})=>name===bootes.name);
        if(foundConst) throw `This constellation ${foundConst.name} already exists`;
        const postData = await axios.post(url, bootes);
        console.log(postData);
      
       
        // console.log(data.name);
        return data.name;
    } catch (error) {
        throw error;
    }
}
getConstellationNameById("n2OEOzp").then(console.log).catch(console.log);

////////////////////////////////////////////////////////////////////////////////////////


//Promise Chaining Solution
axios.get(constellationsUrl).then(({ data }) => {
    //console.log(data.data);
    return data.find(({ name }) => name === bootes.name);  //This returns true if this name already exists in our 'database'
})
    .then((exists) => {       // 'exists' holds the true or false value returned above
        if (exists) throw `Constellation "${bootes.name}" already exists.`;
        return axios.post(constellationsUrl, bootes)
            .then(({ data }) => console.log(data));
    })
    .catch(console.log);



