import { useNavigate } from 'react-router-dom';

type UseNavigateBackProps = {
  defaultPath?: string;
  fromPage?: number;
  fromPostId?: number;
};

export const useNavigateBack = ({ 
  defaultPath = '/', 
  fromPage, 
  fromPostId 
}: UseNavigateBackProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (fromPage && fromPostId) {
      navigate(`/?page=${fromPage}`, { state: { fromPostId } });
      return;
    }
    
    if (fromPage && fromPage > 1) {
      navigate(`/?page=${fromPage}`);
      return;
    }
    
    if (window.history.length <= 2) {
      navigate(defaultPath);
      return;
    }
    
    navigate(-1);
  };

  return { goBack };
};