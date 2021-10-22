import { useForm } from '@hooks/useForm';
import { Paper, TextField, Button, Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';
import { api } from 'src/services/api';

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

interface NewTaskFormValues {
    email: string;
    title: string;
    description: string;
}

interface NewTaskModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTaskModal({ isOpen, onRequestClose }: NewTaskModalProps) {
    const router = useRouter()
    const { formValues, handleChange, onSubmit } = useForm<NewTaskFormValues>({
        initialValues: {
            email: '',
            title: '',
            description: ''
        },
    });

    const { id } = router.query

    async function CreateTask(task: NewTaskFormValues) {
        const email = task.email;
        const title = task.title;
        const description = task.description;

        try {
            await api.post(`/tasks?projectId=${id}`, { email, title, description });
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <Modal
            open={isOpen}
            onClose={onRequestClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Paper
                    component="form"
                    onSubmit={onSubmit((formValues) => {
                        CreateTask(formValues)
                    })}
                >
                    <h2>Cadastrar nova task</h2>

                    {/* <SelectTaskUser /> */}

                    <TextField
                        placeholder="Email"
                        name="email"
                        type="email"
                        label="Email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    <TextField
                        placeholder="Título"
                        name="title"
                        type="title"
                        label="Título"
                        value={formValues.title}
                        onChange={handleChange}
                    />
                    <TextField
                        placeholder="Descrição"
                        name="description"
                        type="description"
                        label="Descrição"
                        value={formValues.description}
                        onChange={handleChange}
                    />

                    <Button type="submit" variant="contained">
                        Cadastrar
                    </Button>
                </Paper>
            </Box>
        </Modal>
    )
}