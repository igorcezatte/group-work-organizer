import * as React from 'react';
import { noop } from 'lodash';

import { UserAvatar } from '@components/UserAvatar';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { parseDate } from '@utils/date';

interface Comment {
  _id: string;
  description: string;
  user: string;
  createdAt: string;
}

type CommentSectionProps = {
  comments: Comment[];
  onSubmitComment?: ({ comment }: { comment: string }) => void;
};

export function CommentSection({
  comments = [],
  onSubmitComment = noop,
}: CommentSectionProps) {
  return (
    <Box sx={{ marginTop: '1rem' }}>
      <Box
        component="form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formValues = new FormData(event.currentTarget);

          const comment = formValues.get('comment') as string;

          if (!!comment) return onSubmitComment({ comment });
        }}
      >
        <TextField
          label="Comentario"
          name="comment"
          placeholder="Escreva seu comentario aqui"
          variant="outlined"
          fullWidth
          multiline
        />
        <Button sx={{ marginTop: '1rem' }} variant="contained" type="submit">
          Comentar
        </Button>
      </Box>
      <Box sx={{ maxHeight: '250px', overflow: 'auto', marginTop: '0.5rem' }}>
        {comments.map((comment) => (
          <Paper
            key={comment._id}
            sx={{ padding: '1.5rem 1rem', marginTop: '1rem' }}
          >
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <UserAvatar userId={comment.user} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <Typography variant="h6" sx={{ margin: 0, textAlign: 'left' }}>
                  {comment.user}
                </Typography>
                <Typography sx={{ textAlign: 'left' }}>
                  {comment.description}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ textAlign: 'left', color: 'gray' }}
                >
                  Postado em:{' '}
                  {parseDate(comment.createdAt).date.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
