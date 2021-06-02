import GridTemplate from 'templates/GridTemplate/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { connect } from 'react-redux';
import { NoteItem } from 'commonTypes';
import { RootState } from 'reducers';

export type NotesProps = {
  readonly notes: NoteItem[];
};

const Notes = ({ notes }: NotesProps) => (
  <GridTemplate>
    {notes.map(({ id, title, content, created }) => (
      <Card id={id} title={title} content={content} created={created} key={id} />
    ))}
  </GridTemplate>
);

const mapStateToProps = (state: RootState) => {
  const { notes } = state;
  return { notes };
};

export default connect(mapStateToProps)(Notes);
