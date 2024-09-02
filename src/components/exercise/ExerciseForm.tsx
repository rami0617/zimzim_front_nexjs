import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '#components/common/Button';
import Input from '#components/common/Input';
import SelectBox from '#components/common/SelectBox';
import Badge from '#components/exercise/Badge';

import { EXERCISE_FORCE_TYPE, EXERCISE_TYPE } from '#stores/exercise/type';
import { AppDispatch, RootState } from '#stores/store';

import DeleteIcon from '#assets/icon/delete.svg?react';
import { exerciseApi, usePostExerciseMutation } from '#/api/exerciseApi';

export type ExercisePostFormInput = {
  date: string;
  duration: string;
  type: EXERCISE_TYPE;
  forceType: EXERCISE_FORCE_TYPE;
  // isPT: boolean;
};

const ExerciseForm = () => {
  const [postExercise] = usePostExerciseMutation();

  const [exerciseList, setExerciseList] = useState<ExercisePostFormInput[]>([]);
  const today = new Date().toISOString().split('T')[0];

  const dispatch = useDispatch<AppDispatch>();
  const userState = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();

  const schema: yup.ObjectSchema<ExercisePostFormInput> = yup.object().shape({
    date: yup.string().required('날짜를 입력해주세요'),
    // isPT: yup.boolean().required('PT 여부를 선택해주세요.'),
    duration: yup.string().required('운동 시간을 입력해 주세요'),
    type: yup
      .mixed<EXERCISE_TYPE>()
      .oneOf(Object.values(EXERCISE_TYPE))
      .required('운동 종류를 입력해주세요'),
    forceType: yup
      .mixed<EXERCISE_FORCE_TYPE>()
      .oneOf(Object.values(EXERCISE_FORCE_TYPE))
      .required('운동 강도를 입력해주세요'),
  });

  const {
    watch,
    trigger,
    reset,
    control,
    formState: { errors },
  } = useForm<ExercisePostFormInput>({
    resolver: yupResolver(schema),
    defaultValues: { date: today },
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const values = Object.values(value);
      if (
        values.length === 4 &&
        values.filter((value) => value === undefined || value === '').length ===
          0
      ) {
        const newExerciseList = [
          ...exerciseList,
          value,
        ] as ExercisePostFormInput[];

        if (newExerciseList.length > 2) {
          alert('최대 2개까지 기록 가능합니다.');
        } else {
          setExerciseList([...newExerciseList]);
          reset({
            date: today,
            duration: '',
            type: undefined,
            forceType: undefined,
          });
          trigger();
        }
      }

      trigger(name);
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger, exerciseList, reset, today]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (exerciseList.length > 0) {
      try {
        const promises = [];
        let isSameDate = false;

        if (exerciseList.length > 1) {
          isSameDate = exerciseList[0].date === exerciseList[1].date;
        }

        if (isSameDate) {
          let totalDuration = exerciseList.reduce(
            (acc, cur) => acc + Number(cur.duration),
            0,
          );

          const detail = exerciseList.map((exercise) => {
            return {
              type: exercise.type,
              duration: exercise.duration,
              force: exercise.forceType,
            };
          });

          const array = {
            date: exerciseList[0].date,
            totalDuration: totalDuration.toString(),
            userId: 'user2',
            detail: detail,
          };

          promises.push(postExercise(array));
        } else {
          const array = exerciseList.map((exercise) => {
            postExercise({
              userId: 'user2',
              totalDuration: exercise.duration,
              date: exercise.date,
              detail: [
                {
                  type: exercise.type,
                  duration: exercise.duration,
                  force: exercise.forceType,
                },
              ],
            });
          });

          promises.push(...array);
        }

        Promise.allSettled(promises).then((result) => {
          alert('등록이 완료 되었습니다');
          dispatch(
            exerciseApi.util.invalidateTags([{ type: 'Exercise', id: 'LIST' }]),
          );
          navigate('/');
        });
      } catch (error) {
        console.log(error, 'error');
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-10">
        <Controller
          name="date"
          control={control}
          defaultValue={today}
          render={({ field }) => (
            <Input
              {...field}
              label="운동 날짜"
              type="date"
              placeholder="2024/00/00"
              className="flex-row items-center"
              inputClassName="w-[220px]"
              max={today}
              errorMessage={errors.date?.message}
            />
          )}
        />
        {/* <Controller
          name="isPT"
          control={control}
          render={({ field }) => (
            <div {...field}>
              <input type="radio" name="isPT" value="Y"></input>
              <label>PT</label>

              <input type="radio" name="isPT" value="N"></input>
              <label>개인운동</label>
            </div>
          )}
        /> */}
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <SelectBox
              {...field}
              label="운동 종류"
              options={[
                { value: EXERCISE_TYPE.WEIGHT, name: 'weight' },
                { value: EXERCISE_TYPE.CARDIO, name: 'cardio' },
              ]}
              selectId="type"
              selectName="type"
              className="flex-row items-center"
              selectClassName="w-[220px]"
              placeHolder="종류를 선택해 주세요"
              errorMessage={errors.type?.message}
            />
          )}
        />
        <Controller
          name="duration"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="운동 시간"
              type="number"
              placeholder="0분"
              className="flex-row items-center"
              inputClassName="w-[220px]"
              errorMessage={errors.duration?.message}
              min={0}
              max={60}
            />
          )}
        />
        <Controller
          name="forceType"
          control={control}
          render={({ field }) => (
            <SelectBox
              {...field}
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
              placeHolder="강도를 선택해 주세요"
              errorMessage={errors.forceType?.message}
            />
          )}
        />
      </div>
      <div className="flex flex-row gap-2 h-6">
        {exerciseList.map((exercise: ExercisePostFormInput) => {
          const newExercise = Object.entries(exercise).map((element) =>
            element[0] === 'duration'
              ? (element = [element[0], element[1] + '분'])
              : element,
          );
          const content = newExercise.reduce(
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
        등록
      </Button>
    </form>
  );
};

export default ExerciseForm;
