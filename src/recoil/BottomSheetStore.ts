import {atom, useRecoilState} from 'recoil';
import React from 'react';

export interface IBottomSheetVisible {
  isBottomSheetVisible: boolean;
}
export interface IBottomSheet {
  content: React.ReactElement | null;
}
const initialBottomVisible: IBottomSheetVisible = {
  isBottomSheetVisible: false,
};
const initialBottomState: IBottomSheet = {
  content: null,
};

export const bottomSheetContent = atom<IBottomSheet>({
  key: 'bottomSheetContent',
  default: initialBottomState,
});

export const bottomSheetVisibleState = atom<IBottomSheetVisible>({
  key: 'bottomSheetVisibleState',
  default: initialBottomVisible,
});

export const useBottomSheet = () => {
  const [content, setContent] = useRecoilState(bottomSheetContent);
  const [isVisible, setIsVisible] = useRecoilState(bottomSheetVisibleState);

  const showBottomSheet = (element: React.ReactElement) => {
    setContent({content: element});
    setIsVisible({isBottomSheetVisible: true});
  };

  const hideBottomSheet = () => {
    setContent({content: null});
    setIsVisible({isBottomSheetVisible: false});
  };

  return {
    showBottomSheet,
    hideBottomSheet,
  };
};
