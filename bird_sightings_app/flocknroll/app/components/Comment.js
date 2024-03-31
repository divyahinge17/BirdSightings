import { useState, useEffect } from 'react';
import { getComment } from "../api/request";
import { saveComment } from "../api/request";

export default function Comment({ user, species_code }) {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const maxLength = 1000;

    useEffect(() => {

        const fetchComment = async () => {
            try {
                const commentsData = await getComment(species_code);
                setComments(commentsData);
            } catch (error) {
                console.log(error)
            }
        };

        if (species_code) {
            fetchComment();
        }

    }, [species_code]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await saveComment(user, species_code, newComment);
            const commentsData = await getComment(species_code);
            setComments(commentsData);
            setNewComment('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='cardmargin-2'>
            <div className="w-full bg-white rounded-lg border p-2">

                <h3 className="font-bold">Comments ({comments.length})</h3>

                <form onSubmit={handleCommentSubmit}>
                    <div className="flex flex-col max-h-96 overflow-y-auto">
                        <div>
                            {comments.map((comment, index) => (
                                <div key={comment._id} className="border rounded-md p-3 ml-3 my-3 ">
                                    <div className="flex gap-3 items-center">
                                        <div className="relative w-6 h-6 overflow-hidden bg-blue-100 rounded-full dark:bg-blue-600">
                                            <svg className="absolute w-8 h-8 text-gray-300 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                        <div className="font-medium dark:text-black">
                                            <div>{comment.user}</div>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mt-2">
                                        {comment.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full px-3 my-2">
                        <textarea
                            placeholder="Type Your Comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            maxLength={maxLength}
                            className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                            required
                        ></textarea>

                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                            <p className="text-xs">Characters remaining: {maxLength - newComment.length}</p>
                            <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Post Comment</button>
                        </div>
                    </div>

                </form>

            </div>
        </div>
    );
}