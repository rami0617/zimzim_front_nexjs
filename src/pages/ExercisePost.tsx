import React from 'react';

import ContentBox from '#components/common/ContentBox';
import ExerciseForm from '#components/exercise/ExerciseForm';

const ExercisePost = () => {
  return (
    <div className="flex pt-8 justify-center">
      <ContentBox className="rounded-2xl gap-8 w-2/5">
        <div className="text-center text-xl">운동을 기록해주세요</div>
        <ExerciseForm />
      </ContentBox>
    </div>
  );
};

export default ExercisePost;
