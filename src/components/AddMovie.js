import { Notyf } from "notyf";
import { useState, useContext, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import UserContext from '../context/UserContext';

export default function AddMovie({show, onHide, fetchData }) {

    const notyf = new Notyf();

    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [year, setYear] = useState(0);
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');

    useEffect(() => {
        if (show) {
            setTitle('');
            setDirector('');
            setYear(0);
            setDescription('');
            setGenre('');
        }
    }, [show]);

    const addMovie = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/addMovie`, {
            method: 'POST',
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
        .then(res => 
            res.json())
        .then(data => {
            console.log(data);
            if(data.success === true) {
                notyf.success('Successfully Added');
                onHide();
                fetchData();
            } else {
                notyf.error('Something went wrong');
                fetchData();
            }
        })
    }

    return (  
        <>

        <Modal show={show} onHide={onHide}>
            <Form onSubmit={addMovie}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="movieTitle">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" required value={title} onChange={e => setTitle(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="movieDirector">
                        <Form.Label>Director</Form.Label>
                        <Form.Control type="text" required value={director} onChange={e => setDirector(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="movieYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="number" required value={year} onChange={e => setYear(Number(e.target.value))}/>
                    </Form.Group>
                    <Form.Group controlId="movieDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={4} required value={description} onChange={e => setDescription(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="movieGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type="text" required value={genre} onChange={e => setGenre(e.target.value)}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                    <Button variant="success" type="submit">Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}