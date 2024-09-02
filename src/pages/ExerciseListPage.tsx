import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

import Button from '#components/common/Button';
import ContentBox from '#/components/common/ContentBox';

import {
  useDeleteExerciseDetailMutation,
  useGetExerciseListQuery,
} from '#/api/services/exerciseApi';
import { useGetUserInfoQuery } from '#/api/services/userApi';
import { Exercise } from '#/api/type';

import LeftArrowIcon from '#assets/icon/left-arrow.svg?react';
import RightArrowIcon from '#assets/icon/right-arrow.svg?react';

type FlattenedExercise = Pick<Exercise, 'date'> &
  Pick<Exercise['detail'][number], 'type' | 'duration' | 'force'>;

// type CheckedExercise = Pick<Exercise, '_id'> &
//   Pick<Exercise['detail'][number], 'original'>;

const ExerciseListPage = () => {
  const columnHelper = createColumnHelper<FlattenedExercise>();
  const [page, setPage] = useState(1);
  const [flattenedData, setFlattenData] = useState<FlattenedExercise[] | []>(
    [],
  );
  const [checkedExercise, setCheckedExercise] = useState<string[]>([]);

  const [deleteExerciseDetail] = useDeleteExerciseDetailMutation();

  const navigate = useNavigate();
  const columns = [
    columnHelper.display({
      id: 'select',
      header: () => (
        <input
          type="checkbox"
          checked={
            flattenedData.length > 0 &&
            checkedExercise.length === flattenedData.length
          }
          onChange={(e) => {
            const checked = e.target.checked;

            if (checked) {
              setCheckedExercise(flattenedData?.flatMap((row) => row._id));
            } else {
              setCheckedExercise([]);
            }
          }}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={checkedExercise.includes(row.original._id)}
          onChange={() => {
            toggleRowSelected(row.original._id);
          }}
        />
      ),
      meta: { className: 'w-1/12 text-left pl-4' },
    }),
    columnHelper.accessor('date', {
      id: 'date',
      cell: (info) => dayjs(info.getValue()).format('YYYY-MM-DD'),
      header: () => '날짜',
      meta: { className: 'w-1/6 text-left' },
    }),
    columnHelper.accessor('isPT', {
      id: 'count',
      cell: (info) => '개인운동',
      header: () => 'PT 여부',
      meta: { className: 'w-1/6 text-right' },
    }),
    columnHelper.accessor('type', {
      id: 'type',
      header: () => '종류',
      cell: (info) => info.renderValue(),
      meta: { className: 'w-1/6 text-right' },
    }),
    columnHelper.accessor('duration', {
      id: 'duration',
      header: () => '시간(분)',
      cell: (info) => info.renderValue() + '분',
      meta: { className: 'w-1/6 text-right' },
    }),
    columnHelper.accessor('force', {
      id: 'force',
      header: () => '강도',
      cell: (info) => info.renderValue(),
      meta: { className: 'w-1/6 text-right pr-4' },
    }),
  ];
  const toggleRowSelected = (id) => {
    setCheckedExercise((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const { data: userInfo } = useGetUserInfoQuery();

  const { data: exerciseData, refetch } = useGetExerciseListQuery(
    {
      userId: userInfo?.id ?? '',
      page,
      limit: 10,
    },
    { skip: !userInfo?.id },
  );

  const table = useReactTable({
    data: flattenedData ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    if (userInfo) {
      refetch();
    }
  }, [page, refetch, userInfo]);

  useEffect(() => {
    if (exerciseData?.items) {
      setFlattenData(
        exerciseData?.items.flatMap((ele) =>
          ele.detail.map((order) => ({
            _id: order._id,
            date: ele.date,
            type: order.type,
            force: order.force,
            duration: order.duration,
          })),
        ),
      );
    }
  }, [exerciseData]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-row justify-end w-4/5 pb-2 gap-4">
        <Button
          className={twMerge(
            `bg-red-500 w-[120px] h-12 rounded-lg text-white font-bold text-md border-1 border-gray-light
            ${checkedExercise.length === 0 && 'cursor-not-allowed'}`,
          )}
          disabled={checkedExercise.length === 0}
          onClick={async () => {
            let temp = [...checkedExercise].flatMap((exercise) =>
              exerciseData?.items.filter((item) =>
                item.detail.find((ele) => ele._id === exercise),
              ),
            );

            const ids = Array.from(new Set(temp.map((ele) => ele?._id)));

            const payload = ids.map((exerciseId) => {
              const exercise = temp.find(
                (exercise) => exercise._id === exerciseId,
              );

              const filteredDetails = exercise?.detail
                .filter((detail) => checkedExercise.includes(detail._id))
                .map((detail) => detail._id);

              return {
                exerciseId,
                detailIds: filteredDetails,
              };
            });
            try {
              await deleteExerciseDetail(payload).unwrap();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          삭제
        </Button>
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
          <thead className="border-b-1 w-full">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className=" pb-2">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={twMerge(
                      'text-center',
                      header.column.columnDef.meta?.className as string,
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="py-2">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={twMerge(
                      'text-center',
                      cell.column.columnDef.meta?.className,
                      'py-2',
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ContentBox>
      <div className="h-6 flex flex-row justify-end gap-2 items-center w-4/5">
        <Button
          className="bg-white h-6 flex items-center justify-center w-6 rounded-md cursor-pointer"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1 || !exerciseData}
        >
          <LeftArrowIcon />
        </Button>
        {Array.from({ length: exerciseData?.totalPages ?? 0 }, (_, i) => (
          <p
            key={i + 1}
            className={twMerge(
              `border-1 border-gray-light w-7 text-center rounded-md cursor-pointer ${exerciseData?.currentPage === i + 1 ? 'bg-primary/25' : 'bg-white'}`,
            )}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </p>
        ))}
        <Button
          className="bg-white h-6 flex items-center justify-center w-6 rounded-md cursor-pointer"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= (exerciseData?.totalPages ?? 1)}
        >
          <RightArrowIcon />
        </Button>
      </div>
    </div>
  );
};

export default ExerciseListPage;
