import { useState, useEffect } from 'react';
import { getComment } from "../api/request";
import { saveComment } from "../api/request";

export default function Comment({ user, species_code }) {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {

        const fetchComment = async () => {
            try {
                const commentsData = await getComment(species_code);
                setComments(commentsData);
            } catch (error) {
                console.log(error)
            }
        };

        if(species_code){
            fetchComment();
        }

    }, [species_code]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newComment.length > 100) {
                setNewComment('Long Comment!');
            } else {
                await saveComment(user, species_code, newComment);
                const commentsData = await getComment(species_code);
                setComments(commentsData);
                setNewComment('');
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="w-full bg-white rounded-lg border p-2 my-4 mx-6">

                <h3 className="font-bold">Comments</h3>

                <form onSubmit={handleCommentSubmit}>
                    <div className="flex flex-col max-h-96 overflow-y-auto">
                        <div>
                            {comments.map((comment, index) => (
                                <div key={comment._id} className="border rounded-md p-3 ml-3 my-3 ">
                                    <div className="flex gap-3 items-center">
                                        <h3 className="font-bold">
                                            {comment.user}
                                        </h3>
                                    </div>
                                    <p class="text-gray-600 mt-2">
                                        {comment.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {newComment !== 'Long Comment!' ? (
                        <div className="w-full px-3 my-2">
                            <textarea
                                placeholder="Type Your Comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                            ></textarea>
                        </div>
                    ) : (
                        <>
                            <div className="w-full px-3 my-2">
                                <p className="text-red-500">Your comment is too long!</p>
                            </div>
                            <div className="w-full px-3 my-2">
                                <textarea
                                    placeholder="Type Your Comment..."
                                    value=""
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                ></textarea>
                            </div>
                        </>
                    )}
                    <div className="w-full flex justify-end px-3">
                        {newComment !== 'Long Comment!' && (
                            <button type="submit" className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500">Post Comment</button>
                        )}
                    </div>
                </form>

            </div>
        </>
    );
}