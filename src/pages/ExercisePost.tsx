import React from 'react';

import ContentBox from '#components/common/ContentBox';
import ExerciseForm from '#components/exercise/post/ExerciseForm';

const ExercisePost = () => {
  return (
    <div className="flex pt-8 justify-center">
      <ContentBox className="rounded-2xl gap-8 w-2/5">
        <ExerciseForm />
      </ContentBox>
    </div>
  );
};

export default ExercisePost;
