import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const ExerciseList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() => {
          navigate('/exercise/post');
        }}
      >
        추가
      </Button>
      List~
    </div>
  );
};

export default ExerciseList;
