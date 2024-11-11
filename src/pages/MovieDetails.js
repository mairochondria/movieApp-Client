import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function MovieDetails() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();

    const notyf = new Notyf();
    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/getMovie/${movieId}`)
            .then(res => res.json())
            .then(data => setMovie(data))
            .catch(() => notyf.error("Error fetching movie details"));

        fetchComments();
    }, [movieId]);

    const fetchComments = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/getComments/${movieId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(res => res.json())
            .then(data => setComments(data.comments))
            .catch(() => notyf.error("Error fetching comments"));
    };

    const handleAddComment = () => {
        if (!isLoggedIn) {
            localStorage.setItem('redirectUrl', window.location.pathname);
            navigate('/login');
            return;
        }

        fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/addComment/${movieId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ comment: newComment }),
        })
        .then(res => res.json())
        .then(data => {
            notyf.success("Comment added successfully");
            setNewComment('');
            fetchComments();  // Refresh comments
        })
        .catch(() => notyf.error("Error adding comment"));
    };

    if (!movie) return <div>Movie not found.</div>;

    return (
        <>
            <Card className="m-5">
                <Card.Header className="bg-secondary text-white p-2 d-flex justify-content-center align-items-center">
                    <h4 className="mb-0">{movie.title.toUpperCase()}</h4>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{movie.description}</Card.Text>
                    <Card.Text className="text-danger">
                        <span className="text-black">Release Date:</span> {new Date(movie.releaseDate).toLocaleDateString()}
                    </Card.Text>

                    <hr />

                    <h5>Comments</h5>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <Card key={index} className="mb-2">
                                <Card.Body>
                                    <Card.Text><strong>User:</strong> {comment.userId}</Card.Text>
                                    <Card.Text>{comment.comment}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}

                    {isLoggedIn && (
                        <Form.Group className="mt-3">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                            />
                            <Button
                                variant="primary"
                                onClick={handleAddComment}
                                className="mt-2"
                                disabled={!newComment.trim()}
                            >
                                Add Comment
                            </Button>
                        </Form.Group>
                    )}
                </Card.Body>
            </Card>
        </>
    );
}