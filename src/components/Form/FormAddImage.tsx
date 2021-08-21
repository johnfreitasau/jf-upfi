import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

type ImageProps = {
  title: string | unknown;
  description: string | unknown;
  url: string;
};

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
      required: 'Arquivo obrigatório.',
      validate: {
        lessThan10MB: (image: File) =>
          image[0]?.size < 10000 * 1024 || 'O arquivo deve ser menor que 10MB',
        acceptedFormats: (image: File) =>
          ['image/jpeg', 'image/png', 'image/gif'].includes(image[0]?.type) ||
          'Somente são aceitos arquivos PNG, JPEG e GIF',
        // /image\/(jpeg|png|gif)/.test(v[0].type)
      },
    },
    title: {
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
      required: 'Title is required',
      min: {
        value: 2,
        message: 'Minimum 2 characters',
      },
      max: {
        value: 20,
        message: 'Maximum 20 characters',
      },
    },
    description: {
      // TODO REQUIRED, MAX LENGTH VALIDATIONS
      required: 'Description is required',
      max: {
        value: 65,
        message: 'Description is required',
      },
    },
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
    (image: ImageProps) => api.post('/api/images', image),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('images');
      },
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      if (!imageUrl) {
        toast({
          title: 'Image not added',
          description:
            'You must add and wait for an image to be uploaded before registering.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });

        return;
      }

      // TODO EXECUTE ASYNC MUTATION
      const { title, description } = data;

      const image = {
        title,
        description,
        url: imageUrl,
      };

      await mutation.mutateAsync(image as ImageProps);

      // TODO SHOW SUCCESS TOAST
      toast({
        title: 'Image registered',
        description: 'Your image has been successfully registered.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
      toast({
        title: 'Registration failure',
        description: 'An error occurred while trying to register your image.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      setImageUrl('');
      setLocalImageUrl('');
      reset();
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          // TODO SEND IMAGE ERRORS
          name="image"
          error={errors?.image}
          // TODO REGISTER IMAGE INPUT WITH VALIDATIONS
          {...register('image', formValidations.image)}
        />

        <TextInput
          placeholder="Image title..."
          // TODO SEND TITLE ERRORS
          name="title"
          error={errors?.title}
          // TODO REGISTER TITLE INPUT WITH VALIDATIONS
          {...register('title', formValidations.title)}
        />

        <TextInput
          placeholder="Image description..."
          // TODO SEND DESCRIPTION ERRORS
          name="description"
          error={errors?.description}
          // TODO REGISTER DESCRIPTION INPUT WITH VALIDATIONS
          {...register('description', formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Submit
      </Button>
    </Box>
  );
}
