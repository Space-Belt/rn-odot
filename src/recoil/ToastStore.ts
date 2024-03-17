import {atom, useRecoilState} from 'recoil';

interface IToastState {
  visible: boolean;
  type: string;
  message: string;
  subMessage: string;
}

const initialToastState: IToastState = {
  visible: false,
  type: '',
  message: '',
  subMessage: '',
};

export const toastSlice = atom<IToastState>({
  key: 'toastState',
  default: initialToastState,
});

export const useToast = () => {
  const [toast, setToast] = useRecoilState(toastSlice);

  const showToast = (message: string, subMessage: string, type: string) => {
    setToast({
      visible: true,
      message: message,
      subMessage: subMessage,
      type: type,
    });
    setTimeout(() => {
      setToast({visible: false, message: '', subMessage: '', type: ''});
    }, 3000);
  };
  return {toast, showToast};
};
