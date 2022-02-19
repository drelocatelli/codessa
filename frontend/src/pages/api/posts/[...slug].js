import { GetAllPosts, GetPostById } from "../../../Services/Posts/PostService";

export default async function handler(req, res) {

    const {slug} = req.query;

    console.log(slug);

    if(slug == 'all') {
        await GetAllPosts()
        .then(response => {
            res.json({posts: response.data.posts});
        }).catch(err => {
            res.end('error');
        });
    } else {
        await GetPostById(slug)
        .then(response => {
            res.json({post: response.data.post});
        }).catch(err => {
            res.end('error');
        });
    }
    
}