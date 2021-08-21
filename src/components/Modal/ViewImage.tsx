import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  ModalCloseButton,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal onClose={onClose} isOpen={isOpen} size="4xl" isCentered>
      <ModalOverlay />
      <ModalContent
        mx="auto"
        mb="2.5rem"
        mt="2.5rem"
        w="auto"
        h="auto"
        maxW={['320px', '540px', '900px']}
        maxH={['360px', '440px', '600px']}
        bg="transparent"
      >
        <ModalBody p="0">
          <ModalCloseButton />
          <Image
            src={imgUrl}
            alt={imgUrl}
            maxW={['320px', '540px', '900px']}
            maxH={['360px', '440px', '600px']}
          />
        </ModalBody>
        <ModalFooter
          bgColor="pGray.800"
          p="2"
          justifyContent="flex-start"
          alignItems="center"
        >
          {' '}
          <Link href={imgUrl} isExternal>
            Open original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
