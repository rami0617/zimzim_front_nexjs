import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import Button from '#components/common/Button';
import ContentBox from '#/components/common/ContentBox';

import { Exercise } from '#/stores/exercise/type';
import { AppDispatch, RootState } from '#/stores/store';
import { getExercise } from '#/stores/exercise/action';

type FlattenedExercise = Pick<Exercise, 'date'> &
  Pick<Exercise['detail'][number], 'type' | 'duration' | 'force'>;

const columnHelper = createColumnHelper<FlattenedExercise>();

const columns = [
  columnHelper.accessor('date', {
    id: 'date',
    cell: (info) => dayjs(info.getValue()).format('YYYY-MM-DD'),
    header: () => '날짜',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('type', {
    id: 'type',
    header: () => '종류',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('duration', {
    id: 'duration',
    header: () => '시간(분)',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('force', {
    id: 'force',
    header: () => '강도',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
];

const ExerciseList = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.user?.id);

  useEffect(() => {
    dispatch(
      getExercise({
        userId: userId ?? '',
      }),
    );
  }, []);

  const exerciseState = useSelector(
    (state: RootState) => state.exercise.exercise,
  );

  const flattenedData: FlattenedExercise[] = exerciseState.flatMap((item) =>
    item.detail.map((order) => ({
      date: item.date,
      type: order.type,
      force: order.force,
      duration: order.duration,
    })),
  );

  const table = useReactTable({
    data: flattenedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col items-center pt-4 gap-6">
      <div className="flex flex-row justify-end w-4/5">
        <Button
          className="bg-primary w-[120px] h-12 rounded-lg text-white font-bold text-md border-1 border-gray-light"
          onClick={() => {
            navigate('/exercise/post');
          }}
        >
          추가
        </Button>
      </div>
      <ContentBox className="rounded-2xl w-4/5 py-4">
        <table className="table-auto w-full">
          <thead className="border-b-1 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="flex pb-2">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="flex-1">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="flex py-2">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-center flex-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ContentBox>
    </div>
  );
};

export default ExerciseList;
