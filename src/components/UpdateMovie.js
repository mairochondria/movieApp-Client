import { Notyf } from "notyf";
import { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import UserContext from '../context/UserContext';

export default function EditMovie({movie, fetchData }) {

    const notyf = new Notyf();

    const [movieId, setMovieId] = useState(movie._id);
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [year, setYear] = useState(0);
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');

    const [showEdit, setShowEdit] = useState(false);

    const openEdit = () => {
        setShowEdit(true);

        setTitle(movie.title);
        setDirector(movie.director);
        setYear(movie.year);
        setDescription(movie.description);
        setGenre(movie.genre);
    }

    const closeEdit = () => {
        setShowEdit(false);

        setTitle('');
        setDirector('');
        setYear(0);
        setDescription('');
        setGenre('');

    }

    const editMovie = (e, movieId) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/updateMovie/${movieId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({
                title,
                director,
                year,
                description,
                genre
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success === true) {
                notyf.success('Successfully Updated');
                closeEdit();
                fetchData();
            } else {
                notyf.error('Something went wrong');
                closeEdit();
                fetchData();
            }
        })
    }

    return (  
        <>
        
        <Button variant="primary" size="sm" onClick={() => openEdit()}>Update</Button>    

        <Modal show={showEdit} onHide={closeEdit}>
            <Form onSubmit={e => editMovie(e, movieId)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="movieTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" required value={title} onChange={e => setTitle(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="movieDirector">
                        <Form.Label>Director</Form.Label>
                        <Form.Control as="textarea" rows={4} required value={director} onChange={e => setDirector(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="movieYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="number" required value={year} onChange={e => setYear(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="movieDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={4} required value={description} onChange={e => setDescription(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="movieGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control as="textarea" rows={4} required value={genre} onChange={e => setGenre(e.target.value)}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeEdit()}>Close</Button>
                    <Button variant="success" type="submit">Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}