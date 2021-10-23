import { SelectProjectUser } from '@components/SelectProjectUser';
import { useForm } from '@hooks/useForm';
import { Paper, TextField, Button, Box } from '@mui/material';
import Modal from '@mui/material/Modal';
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

interface AddUserFormValues {
    email: string;
}

interface AddUserModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function AddUserModal({ isOpen, onRequestClose }: AddUserModalProps) {
    const { formValues, handleChange, onSubmit } = useForm<AddUserFormValues>({
        initialValues: {
            email: ''
        },
    });

    async function CreateTask(task: AddUserFormValues) {
        // const email = task.email;
        // const title = task.title;
        // const description = task.description;

        // try {
        //     await api.post(`/tasks?projectId=${id}`, { email, title, description });
        //     onRequestClose();
        // } catch (err) {
        //     console.log(err);
        // }
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
                    <h2>Adicionar participante</h2>

                    <SelectProjectUser />

                    <Button type="submit" variant="contained">
                        Adicionar
                    </Button>
                </Paper>
            </Box>
        </Modal>
    )
}