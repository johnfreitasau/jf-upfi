import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onClose, onOpen } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url: string): void {
    setSelectedImageUrl(url);
    onOpen();
  }

  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid templateColumns="repeat(3, 1fr)" spacing="10" width="full">
        {cards.map(card => (
          <>
            <Card data={card} viewImage={() => handleViewImage(card.url)} />
            <Card data={card} viewImage={() => handleViewImage(card.url)} />
            <Card data={card} viewImage={() => handleViewImage(card.url)} />
            <Card data={card} viewImage={() => handleViewImage(card.url)} />
            <Card data={card} viewImage={() => handleViewImage(card.url)} />
            <Card data={card} viewImage={() => handleViewImage(card.url)} />
            <Card data={card} viewImage={() => handleViewImage(card.url)} />
            <Card data={card} viewImage={() => handleViewImage(card.url)} />
            <Card data={card} viewImage={() => handleViewImage(card.url)} />
          </>
        ))}
      </SimpleGrid>
      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage
        isOpen={isOpen}
        onClose={onClose}
        imgUrl={selectedImageUrl}
      />
    </>
  );
}

/*
{
  "title": "Doge",
  "description": "The best doge",
  "url": "https://i.ibb.co/K6DZdXc/minh-pham-LTQMgx8t-Yq-M-unsplash.jpg",
  "ts": 1620222828340000,
  "id": "294961059684418048"
},
{
  title: "Inspiring",
  description: "inspiring",
  url: "https://i.ibb.co/X2rccTV/inspiring01.png",
  ts: 1620222828340000,
  id: "294961059684418049"
}
*/
