import PostModel from "../models/Post"

export const create = async (req, res) => {
    try{
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch(err){
        console.log(err);
        res.status(500).json(
            {
                message: "Something went wrong in creating the post"
            }
        );
    }
}