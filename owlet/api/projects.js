const axios = require("axios");

const listProjects = async () => {
    const res = await axios.get("http://localhost:3000/api/projects");
    console.log(res.data)
    const d = (res.data.data || []).map(i => ({
        name: i.name,
        status: i.status
    }))
    const txt = `
        ${d.map(d => d.name).join()}
    `
    return txt
}

module.exports = {
    listProjects,
}