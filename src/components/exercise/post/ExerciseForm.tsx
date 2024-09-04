import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { twMerge } from 'tailwind-merge';

import Button from '#components/common/Button';
import Badge from '#/components/exercise/post/Badge';
import ControllerInput from '#/components/common/input/ControllerInput';
import RadioInput from '#/components/common/input/RadioInput';
import ControllerSelectBox from '#/components/common/SelectBox/ControllerSelectBox';

import { EXERCISE_FORCE_TYPE, EXERCISE_TYPE } from '#/api/type';

import DeleteIcon from '#assets/icon/delete.svg?react';

export type ExercisePostFormInput = {
  _id?: string | null;
  date: string;
  duration: string;
  type?: EXERCISE_TYPE;
  force?: EXERCISE_FORCE_TYPE;
  isPT: string;
};

interface ExerciseFormProps {
  submitButtonTitle: string;
  defaultValues?: ExercisePostFormInput;
  isUseBadge: boolean;
  submitFunction: (
    exerciseList: ExercisePostFormInput | ExercisePostFormInput[],
  ) => void;
}

const ExerciseForm = ({
  submitButtonTitle,
  defaultValues,
  isUseBadge,
  submitFunction,
}: ExerciseFormProps) => {
  const [exerciseList, setExerciseList] = useState<ExercisePostFormInput[]>([]);

  const schema: yup.ObjectSchema<ExercisePostFormInput> = yup.object().shape({
    _id: yup.string().notRequired(),
    date: yup.string().required('날짜를 입력해주세요'),
    isPT: yup.string().required('PT 여부를 선택해주세요.'),
    duration: yup.string().required('운동 시간을 입력해 주세요'),
    type: yup
      .mixed<EXERCISE_TYPE>()
      .oneOf(Object.values(EXERCISE_TYPE))
      .required('운동 종류를 입력해주세요'),
    force: yup
      .mixed<EXERCISE_FORCE_TYPE>()
      .oneOf(Object.values(EXERCISE_FORCE_TYPE))
      .required('운동 강도를 입력해주세요'),
  });

  const {
    watch,
    trigger,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExercisePostFormInput>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const values = Object.values(value);

      const hasAllValue = values.every(
        (value) => value !== undefined && value !== '',
      );

      if (isUseBadge && hasAllValue) {
        const newExerciseList = [
          ...exerciseList,
          value,
        ] as ExercisePostFormInput[];

        if (newExerciseList.length > 2) {
          alert('최대 2개까지 기록 가능합니다.');
        } else {
          setExerciseList([...newExerciseList]);
          reset({
            date: undefined,
            duration: '',
            isPT: 'Y',
            type: undefined,
            force: undefined,
          });
        }
      }

      trigger(name);
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const onSubmit = (data: ExercisePostFormInput) =>
    submitFunction(
      isUseBadge ? (exerciseList as ExercisePostFormInput[]) : data,
    );

  return (
    <form
      onSubmit={handleSubmit((data: ExercisePostFormInput) => onSubmit(data))}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-10">
        <ControllerInput
          name="date"
          control={control}
          defaultValue={defaultValues?.date ?? ''}
          label="운동 날짜"
          type="date"
          placeholder="2024/00/00"
          inputClassName={twMerge(
            `w-[220px] ${!isUseBadge && 'cursor-not-allowed'}`,
          )}
          max={defaultValues?.date}
          disabled={!isUseBadge}
          error={errors?.date}
        />
        <Controller
          name="isPT"
          control={control}
          render={({ field }) => (
            <div {...field} className="flex justify-between gap-1">
              <label className="text-neutral-500">PT 여부</label>
              <div className="flex gap-4">
                <RadioInput
                  label="PT"
                  name="isPT"
                  value="Y"
                  checked={field.value === 'Y'}
                  onChange={field.onChange}
                />
                <RadioInput
                  label="개인운동"
                  name="isPT"
                  value="N"
                  checked={field.value === 'N'}
                  onChange={field.onChange}
                />
              </div>
            </div>
          )}
        />
        <ControllerSelectBox
          name="type"
          control={control}
          label="운동 종류"
          options={[
            { value: EXERCISE_TYPE.WEIGHT, name: 'weight' },
            { value: EXERCISE_TYPE.CARDIO, name: 'cardio' },
          ]}
          selectId="type"
          selectName="type"
          placeHolder="종류를 선택해 주세요"
          error={errors?.type}
          selectClassName="w-[220px]"
        />
        <ControllerInput
          name="duration"
          control={control}
          defaultValue=""
          label="운동 시간"
          type="number"
          placeholder="0분"
          inputClassName="w-[220px]"
          error={errors?.duration}
          min={0}
          max={60}
        />
        <ControllerSelectBox
          name="force"
          control={control}
          label="운동 강도"
          options={[
            { value: EXERCISE_FORCE_TYPE.EASY, name: 'easy' },
            { value: EXERCISE_FORCE_TYPE.MEDIUM, name: 'medium' },
            { value: EXERCISE_FORCE_TYPE.HARD, name: 'hard' },
          ]}
          selectId="force"
          selectName="force"
          selectClassName="w-[220px]"
          placeHolder="강도를 선택해 주세요"
          error={errors?.force}
        />
      </div>
      <div className="flex flex-row gap-2 h-6">
        {isUseBadge &&
          exerciseList.length > 0 &&
          exerciseList.map((exercise: ExercisePostFormInput) => {
            const newExercise = Object.entries(exercise).map((element) =>
              element[0] === 'duration'
                ? (element = [element[0], element[1] + '분'])
                : element,
            );
            const content = newExercise?.reduce(
              (acc, cur) => acc + ' ' + cur[1],
              '',
            );
            return (
              <Badge content={content} key={content}>
                <Button
                  className="p-1"
                  onClick={() => {
                    setExerciseList((prev: ExercisePostFormInput[]) =>
                      prev.filter((element) => element !== exercise),
                    );
                  }}
                >
                  <DeleteIcon width={8} height={10} />
                </Button>
              </Badge>
            );
          })}
      </div>

      <Button
        type="submit"
        className="bg-primary h-12 w-full rounded-lg text-white font-bold text-xl border-1 border-gray-light"
      >
        {submitButtonTitle}
      </Button>
    </form>
  );
};

export default ExerciseForm;
