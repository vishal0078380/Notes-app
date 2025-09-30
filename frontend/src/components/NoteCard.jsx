import React from 'react';
import { Card, CardContent, Typography, Chip, CardActions, Button } from '@mui/material';

export default function NoteCard({note, onEdit, onDelete}){
  return (
    <Card sx={{ mb:2 }}>
      <CardContent>
        <Typography variant="h6">{note.title}</Typography>
        <Typography variant="body2" sx={{ mb:1 }}>{note.content}</Typography>
        <div>
          {note.tags?.slice(0,3).map((t, i) => <Chip key={i} size="small" label={t} sx={{mr:1}} />)}
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onEdit(note)}>Edit</Button>
        <Button size="small" color="error" onClick={() => onDelete(note._id)}>Delete</Button>
      </CardActions>
    </Card>
  );
}
