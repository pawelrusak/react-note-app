import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { v4 as getUuid } from 'uuid';

const notes = [
  {
    id: getUuid(),
    title: 'Wake me up when Vue ends',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
    created: '1 day',
  },
  {
    id: getUuid(),
    title: 'Como es An Gular?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
    created: '1 day',
  },
  {
    id: getUuid(),
    title: 'Du bist Reactish',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
    created: '5 days',
  },
  {
    id: getUuid(),
    title: 'Reactuj się kto moze!',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
    created: '10 days',
  },
];

const Notes = () => (
  <GridTemplate pageType="notes">
    <>
      {notes.map((item) => (
        <Card
          cardType="notes"
          title={item.title}
          content={item.content}
          created={item.created}
          key={item.id}
        />
      ))}
    </>
  </GridTemplate>
);

export default Notes;
