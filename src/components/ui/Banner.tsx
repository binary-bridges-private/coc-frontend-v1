import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { hideBanner } from '../../store/slices/BannerSlice.ts';

const Banner: React.FC = () => {
  const dispatch = useAppDispatch();
  const { visible, imageUrl } = useAppSelector((state) => state.banner);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="relative w-full max-w-5xl overflow-hidden bg-white rounded-lg shadow-lg">
        {/* <img src={imageUrl} alt="Banner" className="object-cover w-full h-auto" /> */}
        <a href="https://www.coceducation.com/new-course/skill-courses/chartered-financial-management" target="_blank" rel="noopener noreferrer">
          <img src={imageUrl} alt="Banner" className="object-cover w-full h-auto cursor-pointer" />
        </a>
        <button
          onClick={() => dispatch(hideBanner())}
          className="absolute text-white bg-red-500 btn btn-sm btn-circle top-3 right-3 hover:bg-red-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Banner;
