import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { v4 as getUuid } from 'uuid';

const twitters = [
  {
    id: getUuid(),
    title: 'Hello Roman',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
    created: '1 day',
    twitterName: 'hello_roman',
  },
  {
    id: getUuid(),
    title: 'Redux guy',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
    created: '1 day',
    twitterName: 'dan_abramov',
  },
  {
    id: getUuid(),
    title: 'React router stuff',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
    created: '5 days',
    twitterName: 'mjackson',
  },
  {
    id: getUuid(),
    title: 'Super animacje!',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
    created: '10 days',
    twitterName: 'sarah_edo',
  },
];

const Twitters = () => (
  <GridTemplate pageType="twitter">
    <>
      {twitters.map((item) => (
        <Card
          cardType="twitter"
          title={item.title}
          content={item.content}
          twitterName={item.twitterName}
          created={item.created}
          key={item.id}
        />
      ))}
    </>
  </GridTemplate>
);

export default Twitters;
