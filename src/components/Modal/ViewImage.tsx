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
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent
        borderBottomRightRadius="6"
        borderBottomLeftRadius="6"
        overflow="hidden"
        background="transparent"
      >
        <ModalBody>
          <ModalCloseButton />
          <Image src={imgUrl} alt={imgUrl} />
        </ModalBody>
        <ModalFooter
          bgColor="pGray.800"
          p="2"
          justifyContent="flex-start"
          alignItems="center"
        >
          {' '}
          <Link href={imgUrl} isExternal>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
