import { connect } from 'react-redux';

import Card from '~/components/molecules/Card/Card';
import GridTemplate from '~/templates/GridTemplate/GridTemplate';

import type { NoteItem } from '~/commonTypes';
import type { RootState } from '~/store';

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

const mapStateToProps = ({ items }: RootState) => ({ notes: items.notes });

export default connect(mapStateToProps)(Notes);
