'use client';

import { useEffect, ReactElement } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/components/Input/Input';
import Button from '@/shared/components/Button/Button';
import SocialAutocomplete from '@/shared/components/SocialAutocomplete/SocialAutocomplete';
import styles from './SocialForm.module.scss';
import { socialNetworks } from '@/shared/constants/social-networks';
import { ClientSocialInterface } from '@/shared/interfaces/social.interface';

const schema = z
  .object({
    network: z
      .string()
      .trim()
      .nonempty('Поле не може бути порожнім')
      .min(2, 'Назва повинна містити від 2 до 50 символів')
      .max(50, 'Назва повинна містити від 2 до 50 символів')
      .regex(/^[a-zA-Zа-яА-ЯґҐїЇєЄ' -]+$/, 'Некоректна назва соцмережі'),
    url: z
      .string()
      .trim()
      .nonempty('Поле не може бути порожнім')
      .min(10, 'Урл повинен містити від 10 до 255 символів')
      .max(255, 'Урл повинен містити від 10 до 255 символів')
      .regex(/^https:\/\/.+$/, 'Некоректне посилання'),
  })
  .superRefine(({ network, url }, ctx) => {
    const match = socialNetworks.find(
      (item) => item.network.toLowerCase() === network.toLowerCase(),
    );

    if (!match) {
      return;
    }

    if (!url.startsWith(match.url)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Посилання не відповідає мережі ' + match.network,
        path: ['url'],
      });
    } else if (match.urlRegex && !match.urlRegex.test(url)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Посилання не відповідає профілю у ' + match.network,
        path: ['url'],
      });
    }
  });

type FormData = z.infer<typeof schema>;

interface SocialFormProps {
  initialValues?: FormData;
  onCancel?: () => void;
  onSubmitForm?: (data: FormData) => void;
}

export default function SocialForm({
  initialValues,
  onCancel,
  onSubmitForm,
}: SocialFormProps): ReactElement {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      network: '',
      url: '',
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    } else {
      reset({
        network: '',
        url: '',
      });
    }
  }, [initialValues, reset]);

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === 'network') {
        trigger('url');
      }
    });
    return (): void => subscription.unsubscribe();
  }, [watch, trigger]);

  const onSubmit = (data: FormData): void => {
    onSubmitForm?.(data);
  };

  const handleSelectSocial = (match: ClientSocialInterface | null): void => {
    if (match && !getValues('url')) {
      setValue('url', match.url, { shouldValidate: true });
    }
  };

  return (
    <form className={styles['social-form']} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles['social-form__fieldset']}>
        <Controller
          name="network"
          control={control}
          render={({ field }) => (
            <SocialAutocomplete
              {...field}
              label="Назва соцмережі"
              suggestions={socialNetworks}
              onSelectSocial={handleSelectSocial}
              errorMessages={
                errors.network?.message && [errors.network.message]
              }
              withError
            />
          )}
        />
        <Input
          {...register('url')}
          label="Посилання"
          placeholder="Посилання"
          withError
          errorMessages={errors.url?.message && [errors.url.message]}
        />
      </fieldset>

      {initialValues ? (
        <div className={styles['social-form__actions']}>
          <Button
            type="button"
            variant="secondary-frame"
            color="green"
            onClick={onCancel}
          >
            Скасувати
          </Button>
          <Button type="submit" color="green" disabled={!isValid}>
            Зберегти
          </Button>
        </div>
      ) : (
        <Button type="submit" fullWidth color="green" disabled={!isValid}>
          Зберегти
        </Button>
      )}
    </form>
  );
}
