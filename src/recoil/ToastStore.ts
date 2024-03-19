import {ViewStyle} from 'react-native';
import {atom, useRecoilState} from 'recoil';

interface IToastMessage {
  type: string;
  message: string;
  subMessage: string;
}

const initialToastState: IToastMessage = {
  type: '',
  message: '',
  subMessage: '',
};

export const toastState = atom<IToastMessage>({
  key: 'toastState',
  default: initialToastState,
});

export const toastVisibility = atom({
  key: 'toastVisibility',
  default: false,
});

export const useToast = () => {
  const [toastMessage, setToastMessage] = useRecoilState(toastState);
  const [isVisible, setIsVisible] = useRecoilState(toastVisibility);

  const showToast = (message: string, subMessage: string, type: string) => {
    setToastMessage({
      message: message,
      subMessage: subMessage,
      type: type,
    });
    setIsVisible(true);

    setTimeout(() => {
      'worklet';
      setToastMessage({message: '', subMessage: '', type: ''});
      setIsVisible(false);
    }, 3000);
  };

  return {showToast};
};
