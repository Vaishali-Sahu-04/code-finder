export const explorePopularRepos = async(req, res) => {
// https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=10

    const {language} = req.params;

    try {
        const exploreRes = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,{
            headers:{
                authorization: `token ${process.env.GITHUB_API_KEY}`
            }
        });
        const data = await exploreRes.json();
         res.status(200).json({repos:data.items});
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}