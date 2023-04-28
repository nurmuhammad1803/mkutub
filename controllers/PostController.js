import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json(
            {
                message: "Something went wrong in seeing posts"
            }
        );
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 }
            },
            {
                returnDocument: 'after'
            }
        );

        if (!doc) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.json(doc);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong on the server"
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = await PostModel.findOneAndDelete({ _id: postId });
        if (err) {
            console.log(err);
            return res.status(403).json({
                message: "You have no access to delete this post"
            });
        }
        if (!doc) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.json({
            message: "Post successfully deleted"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong on the server"
        });
    }
};


export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(
            {
                message: "Something went wrong in creating the post"
            }
        );
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags,
            }
        )

        res.json({
            message: "Post successfully updated"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong on the server"
        });
    }
}