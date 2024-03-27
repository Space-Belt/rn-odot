import {atom, useRecoilState} from 'recoil';

interface IToastMessage {
  type: string;
  message: string;
}

const initialToastState: IToastMessage = {
  type: '',
  message: '',
};

export const toastContent = atom<IToastMessage>({
  key: 'toastContent',
  default: initialToastState,
});

export const toastVisibility = atom({
  key: 'toastVisibility',
  default: false,
});

export const useToast = () => {
  const [toastMessage, setToastMessage] = useRecoilState(toastContent);
  const [isVisible, setIsVisible] = useRecoilState(toastVisibility);

  const showToast = (message: string, type: string) => {
    setToastMessage({
      message: message,
      type: type,
    });
    setIsVisible(true);

    setTimeout(() => {
      setToastMessage({message: '', type: ''});
      setIsVisible(false);
    }, 2300);
  };

  return {showToast, isVisible};
};
