import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography, Card } from '@mui/material';
import Link from 'next/link';

type ProjectItemProps = {
    project: {
        _id: string;
        name: string;
        ownerId: string;
        deadline: Date;
        course: string;
        status: string;
    };
};

export function ProjectCard({ project }: ProjectItemProps) {
    return (
        <Link href={`/projects/${project._id}`}>
            <Card sx={{ minWidth: 250, maxHeight: 130, margin: 1.5, cursor: "pointer" }}>
                <CardActions>
                    <CardContent>
                        <Typography sx={{ mb: 2 }} variant="h5" component="div">
                            {project.name}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" variant="body2">
                            Data de entrega: {project.deadline}
                        </Typography>
                    </CardContent>
                </CardActions>
            </Card>
        </Link>
    );
};