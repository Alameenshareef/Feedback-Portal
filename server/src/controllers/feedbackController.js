const Feedback = require('../models/Feedback')

exports.createFeedback = async (req, res) => {
    
    try {        
        const { text, rating } = req.body;
         const image = req.file ? req.file.path : null;
        const feedback = await Feedback.create({
            user: req.user.id,
            text,
            rating,
            image,
        })
        res.status(201).json(feedback);
    } catch (error) {
        res.status(400).json({ error: 'Failed to submit feedback' });
    }
}


exports.getAllFeedback = async (req,res)=>{
    const { rating, sort } = req.query;

    const filter = rating ? { rating } : {};
    const sortBy = sort === 'asc' ? 'createdAt' : '-createdAt';

    try {
        const feedbacks = await Feedback.find(filter).sort(sortBy).populate('user', 'name email');
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch feedback' }); 
    }
}


exports.addComment = async (req,res)=>{
    const {comment} = req.body

    try {
        const updated = await Feedback.findByIdAndUpdate(
            req.params.id,
            {comment},
            {new:true}
        )
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add comment' });   
    }

}