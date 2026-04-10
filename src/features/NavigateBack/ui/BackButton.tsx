import { useNavigateBack } from '../model/useNavigateBack';
import styles from './BackButton.module.css';

type NavigateBackButtonProps = {
  defaultPath?: string;
  fromPage?: number;
  fromPostId?: number;
  className?: string;
};

export const NavigateBackButton = ({ 
  defaultPath = '/', 
  fromPage, 
  fromPostId,
}: NavigateBackButtonProps) => {
  const { goBack } = useNavigateBack({ defaultPath, fromPage, fromPostId });

  return (
    <button onClick={goBack} className={styles.backButton}>
      ← Back
    </button>
  );
};