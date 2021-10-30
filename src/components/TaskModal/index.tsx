import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import { api } from 'src/services/api';

import { Task } from 'src/hooks/useManageTasks';
import { useEffect, useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Comment {
    _id: string;
    description: string;
    user: string;
    createdAt: string;
}

interface TaskModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    task: Task;
}

export function TaskModal({ isOpen, onRequestClose, task }: TaskModalProps) {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        async function getComments() {
            if (!task._id) {
                return;
            }

            const response = await api.get<Comment[]>('/comments/getbytask', {
                params: { id: task._id },
            });

            setComments(response.data);
        }
        try {
            getComments();
        } catch (err) {
            console.log(err);
        }
    }, [task]);

    return (
        <Modal
            open={isOpen}
            onClose={onRequestClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h2>Task</h2>
                <p>Responsável: {task.userName}</p>
                <p>Título: {task.title}</p>
                <p>Descrição: {task.description}</p>
                <h2>Comentários: </h2>
                {comments[0] ? comments.map(r => (<p>{r.description}</p>)) : null}
            </Box>
        </Modal>
    )
}