import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '#components/common/Button';
import ContentBox from '#components/common/ContentBox';
import Input from '#components/common/Input';
import SelectBox from '#components/common/SelectBox';
import Badge from '#components/exercise/Badge';

import { EXERCISE_FORCE_TYPE, EXERCISE_TYPE } from '#/stores/exercise/type';

import DeleteIcon from '#assets/icon/x-solid.svg?react';
import { useRef } from 'react';

export type ExercisePostFormInput = {
  date: string;
  duration: string;
  type: EXERCISE_TYPE;
  forceType: EXERCISE_FORCE_TYPE;
};

const ExercisePost = () => {
  const [exerciseList, setExerciseList] = useState<string[]>([]);
  const typeRef = useRef<HTMLSelectElement>(null);
  const forceTypeRef = useRef<HTMLSelectElement>(null);

  const schema = yup
    .object()
    .shape({
      date: yup.string().required('날짜를 입력해주세요'),
      duration: yup.string().required('시간을 입력해주세요'),
      type: yup
        .mixed<EXERCISE_TYPE>()
        .oneOf(Object.values(EXERCISE_TYPE))
        .required('운동 종류를 입력해주세요'),
      forceType: yup
        .mixed<EXERCISE_FORCE_TYPE>()
        .oneOf(Object.values(EXERCISE_FORCE_TYPE))
        .required('운동 강도를 입력해주세요'),
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ExercisePostFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      trigger(name);
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const onSubmit = async (data: ExercisePostFormInput) => {
    const joinedData = Object.values(data).join(' ');
    setExerciseList((prev) => [...prev, joinedData]);
    try {
    } catch (error) {
      console.log(error, 'error');
    }
  };

  return (
    <div className="flex pt-8 justify-center">
      <ContentBox className="rounded-2xl gap-11 w-2/5">
        <div className="text-center text-xl">운동을 기록해주세요</div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <div className="flex flex-col gap-10">
            <Input
              label="운동 날짜"
              type="date"
              placeholder="2024/00/00"
              className="flex-row items-center"
              inputClassName="w-[220px]"
              {...register('date')}
              errorMessage={errors.date?.message}
            />
            <SelectBox
              label="운동 종류"
              options={[
                { value: EXERCISE_TYPE.WEIGHT, name: 'weight' },
                { value: EXERCISE_TYPE.CARDIO, name: 'cardio' },
              ]}
              selectId="type"
              selectName="type"
              className="flex-row items-center"
              selectClassName="w-[220px]"
              {...register('type')}
              placeHolder="종류를 선택해 주세요"
              errorMessage={errors.type?.message}
            />
            <Input
              label="운동 시간"
              type="number"
              placeholder="0분"
              className="flex-row items-center"
              inputClassName="w-[220px]"
              {...register('duration')}
              errorMessage={errors.duration?.message}
            />

            <SelectBox
              label="운동 강도"
              options={[
                { value: EXERCISE_FORCE_TYPE.EASY, name: 'easy' },
                { value: EXERCISE_FORCE_TYPE.MEDIUM, name: 'medium' },
                { value: EXERCISE_FORCE_TYPE.HARD, name: 'hard' },
              ]}
              selectId="forceType"
              selectName="forceType"
              className="flex-row items-center"
              selectClassName="w-[220px]"
              {...register('forceType')}
              placeHolder="강도를 선택해 주세요"
              errorMessage={errors.forceType?.message}
            />
          </div>
          <div className="flex flex-row gap-2 pb-1">
            {exerciseList.map((ele) => (
              <Badge content={ele} key={ele}>
                <Button>
                  <DeleteIcon
                    width={8}
                    onClick={() => {
                      setExerciseList((prev) =>
                        prev.filter((element) => element !== ele),
                      );
                    }}
                  />
                </Button>
              </Badge>
            ))}
          </div>

          <Button
            type="submit"
            className="bg-primary h-12 w-full rounded-lg text-white font-bold text-xl border-1 border-gray-light"
          >
            등록
          </Button>
        </form>
      </ContentBox>
    </div>
  );
};

export default ExercisePost;
